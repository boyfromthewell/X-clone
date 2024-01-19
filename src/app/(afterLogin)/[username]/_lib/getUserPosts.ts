import { Post } from "@/model/Post";
import { QueryFunction } from "@tanstack/react-query";

export const getUserPosts: QueryFunction<Post[], [_1: string, _2: string, _3: string]>
= async ({ queryKey }) => {
    const [_1, _2, username] = queryKey;
    const res = await fetch(`http://localhost:9090/api/users/${username}/posts`, {
        next: {
            tags: ['posts', 'users', username],
        },
    });
    if (!res.ok) throw new Error('Failded to fetch data');

    return res.json();
}