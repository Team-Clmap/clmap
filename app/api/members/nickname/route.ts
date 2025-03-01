import { NextRequest } from "next/server";
import { MemberService } from "../../service/MemberService";
import { getServerSession } from "next-auth/next";
import {authOptions} from "../../auth/[...nextauth]/route";
import withErrorHandler from '@/utils/server-exception';

export interface Nickname {
    nickname: string;
}

export interface CreateNicknameResponse {
    status: number;
    message: string;
    data: Nickname;
}

/**
 * @swagger
 * /api/members/nickname:
 *   get:
 *     description: 닉네임 생성
 *     responses:
 *       200:
 *         description: Hello world!
 */
export const GET = withErrorHandler(async function(request: NextRequest):Promise<Response> {
    const memberService = MemberService.getInstance();
    const session = await getServerSession(authOptions);
    const result = await memberService.createNickname();
    //응답 body 생성
    const responseBody: CreateNicknameResponse = {
        status: 200,
        message: "ok",
        data: result
    }
    //응답
    return new Response(JSON.stringify(responseBody), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
})

/**
 * @swagger
 * /api/members/nickname:
 *   post:
 *     description: 닉네임 확정
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 description: 사용자 닉네임
 *             required:
 *               - nickname
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
export const POST = withErrorHandler(async function(request: NextRequest) {
    const memberService = MemberService.getInstance();
    
    const data: Nickname = await request.json();
    
    const session = await getServerSession(authOptions);
    if (session != null) {
        const result = await memberService.createMemberInitNickname(data, session.user.id);
        //응답 body 생성
        const responseBody = {
            status: 200,
            message: "ok"
        }
        //응답
        return new Response(JSON.stringify(responseBody), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }
})

