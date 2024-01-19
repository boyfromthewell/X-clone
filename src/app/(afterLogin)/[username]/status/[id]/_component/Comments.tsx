'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Post as IPost } from '@/model/Post';
import { getComments } from '../_lib/getComments';
import Post from '@/app/(afterLogin)/_component/Post';

type CommentProps = {
    id: string;
};

export default function Comments({ id }: CommentProps) {
    const queryClient = useQueryClient();
    const post = queryClient.getQueryData(['posts', id]);

    const { data } = useQuery<IPost[], Object, IPost[], [_1: string, _2: string, _3: string]>({
        queryKey: ['posts', id, 'comments'],
        queryFn: getComments,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
        enabled: !!post,
    });
    if (post) {
        return data?.map((post) => <Post post={post} key={post.postId} />);
    }
    return null;
}
