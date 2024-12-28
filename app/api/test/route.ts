import type { NextApiRequest, NextApiResponse } from 'next';
import { checkConnection } from "./checkConnection";

/**
 * @swagger
 * /api/test:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: Hello World!
 */
export async function GET(request: Request) {
    const result = await checkConnection();
    console.log(JSON.stringify(result));
    return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}