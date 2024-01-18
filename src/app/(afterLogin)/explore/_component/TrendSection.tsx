'use client';
import { useQuery } from '@tanstack/react-query';
import { getTrends } from '../../_lib/getTrends';
import { Hashtag } from '@/model/Hashtag';
import Trend from '../../_component/Trend';

export default function TrendSection() {
    const { data } = useQuery<Hashtag[]>({
        queryKey: ['trends'],
        queryFn: getTrends,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });

    return data?.map((trend) => <Trend trend={trend} key={trend.tagId} />);
}
