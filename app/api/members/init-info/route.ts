import { NextRequest } from "next/server";
import { MemberService } from "../service";
import { getServerSession } from "next-auth/next";
import {authOptions} from "../../auth/[...nextauth]/route";

export interface CreateInitInfoRequest {
    nickname: string;
    climbingStartDate?: Date;
    userInstagramId?: string;
    crewName?: string;
    profileImage?: File;
}

/**
 * @swagger
 * /api/members/init-info:
 *   post:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *               climbingStartDate:
 *                 type: string
 *               userInstagramId:
 *                 type: string
 *               crewName:
 *                 type: string
 *               profileImage:
 *                 type: string         
 *             required:
 *               - name
 */
export async function POST(request: NextRequest) {
    const memberService = MemberService.getInstance();
    const session = await getServerSession(authOptions);
    const data:CreateInitInfoRequest = await request.json();
    if (session) {
        console.log(session, data)
        const result = await memberService.createMemberInitInfo(data, session.user.id);
    }
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