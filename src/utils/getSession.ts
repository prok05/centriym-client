import {cookies} from "next/headers";
import jwt from "jsonwebtoken";
import {string} from "prop-types";

const SECRET = process.env.JWT_SECRET || 'secret'

interface DecodedToken {
    userID: string
    role: string
    expiredAt: number
}

export async function getSession() {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
        return null; // Если токен отсутствует
    }

    try {
        // Расшифровываем токен
        const decoded = jwt.verify(token.value, SECRET) as DecodedToken;
        return {
            user: {
                id: parseInt(decoded.userID, 10),
                role: decoded.role,
            }
        }
    } catch (error) {
        console.error('Invalid JWT token:', error);
        return null; // Если токен некорректный
    }
}