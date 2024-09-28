import { useState, useEffect } from 'react';

// @ts-ignore
export function useUserID(): number {
    const [userID, setUserID] = useState<number | null>(null);

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
            }
        };

        fetchUserID();
    }, []);

    if (userID)
    return Number(userID);
}
