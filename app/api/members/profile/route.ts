import { NextRequest } from "next/server";
import { MemberService } from "../../service/MemberService";
import { getServerSession } from "next-auth/next";
import {authOptions} from "../../auth/[...nextauth]/route";
import { UpdateMemberProfileRequest } from "./dto";
import withErrorHandler from '@/utils/server-exception';

/**
 * @swagger
 * /api/members/profile:
 *   put:
 *     summary: Update member profile
 *     description: Updates the member's profile information, including nickname, Instagram ID, crew name, titles, and profile image.
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 description: Nickname of the member
 *                 example: 포근한귀리
 *               userInstagramId:
 *                 type: string
 *                 description: Instagram ID of the member
 *                 example: "@cozy_oats"
 *               crewName:
 *                 type: string
 *                 description: Crew name of the member
 *                 example: "포근클라이밍"
 *               titleIds:
 *                 type: array
 *                 description: List of title IDs associated with the member
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3, 4, 5, 6]
 *               profileImage:
 *                 type: string
 *                 format: binary
 *                 description: Profile image of the member
 *     responses:
 *       200:
 *         description: Successfully updated the profile
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
 *                   example: "Profile updated successfully"
 */

export const PUT = withErrorHandler(async function(request: NextRequest):Promise<Response> {
    const memberService = MemberService.getInstance();
    const session = await getServerSession(authOptions);
    const formData= await request.formData();
    const data: UpdateMemberProfileRequest = {
        nickname: formData.get("nickname") as string | null,
        userInstagramId: formData.get("userInstagramId") as string | null,
        crewName: formData.get("crewName") as string | null,
        titleIds: formData.get("titleIds") as number[] | null,
        profileImage: formData.get("profileImage") as File | null
    }
    if (session) {
        console.log(session, data)
        const result = await memberService.updateMemberProfile(data, session.user.id);
    }
    //응답
    return new Response(null, {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
})
