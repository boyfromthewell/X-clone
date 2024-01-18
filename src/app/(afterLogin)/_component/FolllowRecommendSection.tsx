'use client';
import { useQuery } from '@tanstack/react-query';
import { getFollowRecommends } from '../_lib/getFollowRecommends';
import { User } from '@/model/User';
import FollowRecommend from './FollowRecommend';

export default function FollowRecommendSection() {
    const { data } = useQuery<User[]>({
        queryKey: ['users', 'followRecommends'],
        queryFn: getFollowRecommends,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });

    return data?.map((user) => <FollowRecommend user={user} key={user.id} />);
}
