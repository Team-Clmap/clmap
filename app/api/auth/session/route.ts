import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../[...nextauth]/route";
import withErrorHandler from '@/utils/server-exception';

/**
 * @swagger
 * /api/auth/session:
 *   get:
 *     description: 현재 로그인된 사용자의 세션 정보 조회
 *     responses:
 *       200:
 *         description: 현재 세션 정보
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
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "123456789"
 *                         email:
 *                           type: string
 *                           example: "user@example.com"
 *                     isNewUser:
 *                       type: boolean
 *                       example: false
 *                     isInited:
 *                       type: boolean
 *                       example: true
 *                     accessToken:
 *                       type: string
 *                       example: "access_token_value"
 */
export const GET = withErrorHandler(async function(request: NextRequest) {
    const session = await getServerSession(authOptions);
    
    if (!session) {
        return new Response(JSON.stringify({
            status: 401,
            message: "Unauthorized",
            data: null
        }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    
    const result = {
        status: 200,
        message: "ok",
        data: session
    };
    
    return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
});