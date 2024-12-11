import jwt from 'jsonwebtoken';

// @ts-ignore
export function decodeToken(token) {
    try {
        const secret = process.env.JWT_SECRET;
        // @ts-ignore
        return jwt.verify(token, secret);
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
}