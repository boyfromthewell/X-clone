'use client';

import { useQuery } from '@tanstack/react-query';
import { getPostRecommends } from '../_lib/getPostRecommends';
import Post from '../../_component/Post';
import { Post as IPost } from '@/model/Post';
import { Fragment } from 'react';

export default function PostRecommends() {
    const { data } = useQuery<IPost[]>({
        queryKey: ['posts', 'recommends'],
        queryFn: getPostRecommends,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });
    // staleTime: fresh -> stale로 가는 타임 (그동안 캐시 데이터 사용)
    // gcTime: inactive일때 시간이 지나면 데이터를 날리는 시간 (가비지 컬렉션)
    // staleTime은 gcTime 보다 짧아야 함!!
    return (
        <>
            {data?.map((post) => (
                <Fragment key={post.postId}>
                    <Post key={post.postId} post={post} />
                </Fragment>
            ))}
        </>
    );
}
