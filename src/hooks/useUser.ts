import { useState, useEffect } from 'react';
import jwt from "jsonwebtoken";

interface User {
    id: number;
    name: string;
    balance: string;
    paid_lesson_count: number;
    role: string;
}

interface UseUserResult {
    user: User | null;
    error: string | null;
    isLoading: boolean;
}

export function useUser(): UseUserResult {
    const [user, setUser] = useState<User | null>(null);
    const [userID, setUserID] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserID = async () => {
            try {
                const res = await fetch('/api/me', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch user ID');
                }
                const data = await res.json();
                setUserID(data.userID);
            } catch (err: any) {
                console.log(err)
                setError(err.message);
            }
        };

        fetchUserID();
    }, []);


    useEffect(() => {
        const fetchUser = async () => {
            if (userID === null) return;
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/alpha/users/${userID}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user');
                }

                const userData = await response.json();
                console.log("userdata:", userData)
                setUser(userData);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, [userID]);

    return { user, error, isLoading };
}
