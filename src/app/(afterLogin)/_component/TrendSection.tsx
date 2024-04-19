'use client';
import { usePathname } from 'next/navigation';
import Trend from './Trend';
import styles from './trendSection.module.css';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { getTrends } from '../_lib/getTrends';
import { Hashtag } from '@/model/Hashtag';
import React from 'react';

export default function TrendSection() {
    const pathname = usePathname();
    const { data: session } = useSession();

    const { data } = useQuery<Hashtag[]>({
        queryKey: ['trends'],
        queryFn: getTrends,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
        enabled: !!session?.user,
    });

    console.log(data);

    if (pathname === '/explore') return null;
    if (session?.user) {
        return (
            <div className={styles.trendBg}>
                <div className={styles.trend}>
                    <h3>나를 위한 트렌드</h3>
                    {data?.map((trend) => (
                        <React.Fragment key={trend.tagId}>
                            <Trend trend={trend} />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={styles.trendBg}>
            <div className={styles.noTrend}>트렌드를 가져 올 수 없습니다.</div>
        </div>
    );
}
