import type { NextApiRequest, NextApiResponse } from 'next';
import { checkConnection } from "./checkConnection";

export async function GET(request: NextApiRequest) {
    const result = await checkConnection();
    console.log(JSON.stringify(result));
    return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}