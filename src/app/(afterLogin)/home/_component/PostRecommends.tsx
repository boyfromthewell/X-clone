'use client';

import { InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getPostRecommends } from '../_lib/getPostRecommends';
import Post from '../../_component/Post';
import { Post as IPost } from '@/model/Post';
import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function PostRecommends() {
    // isLoading - isPending && isFetching
    const { data, fetchNextPage, isFetching, hasNextPage, isPending, isLoading } = useInfiniteQuery<
        IPost[],
        Object,
        InfiniteData<IPost[]>,
        [_1: string, _2: string],
        number
    >({
        queryKey: ['posts', 'recommends'],
        queryFn: getPostRecommends,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    });
    // staleTime: fresh -> stale로 가는 타임 (그동안 캐시 데이터 사용)
    // gcTime: inactive일때 시간이 지나면 데이터를 날리는 시간 (가비지 컬렉션)
    // staleTime은 gcTime 보다 짧아야 함!!
    const { ref, inView } = useInView({ threshold: 0, delay: 0 });

    useEffect(() => {
        if (inView) {
            !isFetching && hasNextPage && fetchNextPage();
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    return (
        <>
            {data?.pages.map((page, i) => (
                <Fragment key={i}>
                    {page.map((post) => (
                        <Post key={post.postId} post={post} />
                    ))}
                </Fragment>
            ))}
            <div ref={ref} style={{ height: 50 }} />
        </>
    );
}
