'use client';

import { useQuery } from '@tanstack/react-query';

import Post from '@/app/(afterLogin)/_component/Post';
import { Post as IPost } from '@/model/Post';
import { getSinglePost } from '../_lib/getSinglePost';

export default function SinglePost({ id, noImage }: { id: string; noImage?: boolean }) {
    const { data: post, error } = useQuery<IPost, Object, IPost, [_1: string, _2: string]>({
        queryKey: ['posts', id],
        queryFn: getSinglePost,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });

    if (error) {
        return (
            <div
                style={{
                    fontSize: 31,
                    fontWeight: 'bold',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 100,
                }}
            >
                게시글을 찾을 수 없습니다.
            </div>
        );
    }
    if (!post) return null;

    return <Post key={post.postId} post={post} noImage={noImage} />;
}
