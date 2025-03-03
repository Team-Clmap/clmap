import { NextRequest } from "next/server";
import { MemberService } from "../../service/MemberService";
import { getServerSession } from "next-auth/next";
import {authOptions} from "../../auth/[...nextauth]/route";
import withErrorHandler from '@/utils/server-exception';

type Params = Promise<{ memberId: string }>

/**
 * @swagger
 * /api/members/{memberId}:
 *   get:
 *     description: 본인 프로필 정보 조회
 *     parameters:
 *       - name: memberId
 *         in: path
 *         description: member ID
 *         required: true
 *         schema:
 *           type: string
 *           example: 1
 *     responses:
 *       200:
 *         description: 유저의 프로필 정보를 조회할 수 있음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "ok"
 *                 data:
 *                   type: object
 *                   properties:
 *                     nickname:
 *                       type: string
 *                       example: "포근한귀리"
 *                     userInstagramId:
 *                       type: string
 *                       example: "@cozy_oats"
 *                     climbingStartDate:
 *                       type: string
 *                       format: date
 *                       example: "2023.10.26"
 *                     recentClimbingDate:
 *                       type: string
 *                       format: date
 *                       example: "2024.10.24"
 *                     averageClimbingTime:
 *                       type: string
 *                       example: "2시간 24분"
 *                     averageClearRate:
 *                       type: string
 *                       example: "74%"
 *                     averageGrade:
 *                       type: string
 *                       example: "V4"
 *                     crewName:
 *                       type: string
 *                       example: "육회크루"
 *                     titles:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           titleId:
 *                             type: integer
 *                             example: 1
 *                           titleName:
 *                             type: string
 *                             example: "겉멋의클라이머"
 *                           titleColor:
 *                             type: string
 *                             example: "#111111"
 *                     profileImage:
 *                       type: string
 *                       example: "이미지url"
 *                     userMembershipInfos:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           membershipCenterName:
 *                             type: string
 *                             example: "더클연남"
 *                           membershipType:
 *                             type: string
 *                             example: "한달권"
 *                           membershipRegistrationDate:
 *                             type: string
 *                             format: date
 *                             example: "24.10.20"
 *                           membershipExpirationDate:
 *                             type: string
 *                             format: date
 *                             example: "24.11.20"
 *                           membershipRestInfo:
 *                             type: string
 *                             example: "20일"
 */
export const GET = withErrorHandler(async function(request: NextRequest, { params }: { params: Params }) {
    const memberService = MemberService.getInstance();
    const id = (await params).memberId;
    const result = await memberService.getMemberProfile(id);
    //응답
    return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
});