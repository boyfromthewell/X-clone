'use client';
import { useState } from 'react';
import styles from '../search.module.css';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Tab() {
    const [current, setCurrent] = useState('hot');
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleClickHot = () => {
        setCurrent('hot');
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete('f');
        router.replace(`/search?${newSearchParams.toString()}`);
    };

    const handleClickNew = () => {
        setCurrent('new');
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('f', 'live');
        router.replace(`/search?${newSearchParams.toString()}`);
    };

    return (
        <div className={styles.homeFixed}>
            <div className={styles.homeTab}>
                <div onClick={handleClickHot}>
                    인기
                    <div className={styles.tabIndicator} hidden={current === 'new'}></div>
                </div>
                <div onClick={handleClickNew}>
                    최신
                    <div className={styles.tabIndicator} hidden={current === 'hot'}></div>
                </div>
            </div>
        </div>
    );
}
