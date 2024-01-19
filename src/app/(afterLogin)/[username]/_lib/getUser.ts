import { User } from "@/model/User";
import { QueryFunction } from "@tanstack/react-query";

export const getUser: QueryFunction<User, [_1: string, _2: string]>
= async ({ queryKey }) => {
    const [_1, username] = queryKey;
    const res = await fetch(`http://localhost:9090/api/users/${username}`, {
        next: {
            tags: ['users', username],
        },
    });
    if (!res.ok) throw new Error('Failded to fetch data');

    return res.json();
}