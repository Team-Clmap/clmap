import { NextRequest } from "next/server";
import { MemberService } from "./service";
import { getServerSession } from "next-auth/next";
import {authOptions} from "../auth/[...nextauth]/route";
import withErrorHandler from '@/utils/server-exception';

/**
 * @swagger
 * /api/members:
 *   delete:
 *     summary: 유저 탈퇴 요청
 *     description: 현재 로그인한 사용자의 계정을 삭제합니다.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 탈퇴 성공
 *       401:
 *         description: 인증되지 않은 사용자
 *       500:
 *         description: 서버 오류
 */
export const DELETE = withErrorHandler(async function(request: NextRequest) {
    const memberService = MemberService.getInstance();
    const session = await getServerSession(authOptions);
    if (session) {
        const result = await memberService.deleteMember(session);
        //응답
        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }
});