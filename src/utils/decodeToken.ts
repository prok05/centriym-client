import jwt from 'jsonwebtoken';

export function decodeToken(token) {
    try {
        const secret = process.env.JWT_SECRET; // Убедитесь, что секрет совпадает с тем, что используется на сервере Go
        return jwt.verify(token, secret); // Возвращает полезную нагрузку токена
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
}