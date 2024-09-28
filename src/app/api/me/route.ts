import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
    const cookieStore = cookies()
    const token = cookieStore.get('token')

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const decodedToken = jwt.decode(token.value) as { userID: number };
        return NextResponse.json({ userID: decodedToken.userID }, { status: 200 });
    } catch (error) {
        console.error('Token verification failed:', error);
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
}
