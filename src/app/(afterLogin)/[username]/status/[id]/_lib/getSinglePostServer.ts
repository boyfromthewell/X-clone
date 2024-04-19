import { cookies } from "next/headers";

export const getSinglePostServer = async ({ queryKey }: {queryKey : [string, string]}) => {
    const [_1, id] = queryKey;
    const res = await fetch(`http://localhost:9090/api/posts/${id}`, {
        next: {
            tags: ['posts', id],
        },
        credentials:'include',
        headers: {Cookie : cookies().toString()}
       
    });
    if (!res.ok) throw new Error('Failded to fetch data');

    return res.json();
}