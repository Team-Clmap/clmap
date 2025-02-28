import { NextRequest } from "next/server";
import { MemberService } from "../../service/MemberService";
import { getServerSession } from "next-auth/next";
import {authOptions} from "../../auth/[...nextauth]/route";

export interface CreateInitInfoRequest {
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               climbingStartDate:
 *                 type: string
 *                 format: date
 *                 example: "2023.10.26"
 *               userInstagramId:
 *                 type: string
 *                 example: "@cozy_oats"
 *               crewName:
 *                 type: string
 *                 example: "포근클라이밍"
 *               profileImage:
 *                 type: string
 *                 format: uri
 *                 example: "https://example.com/images/profile.jpg"
 *             required:
 *               - nickname
 *               - climbingStartDate
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