import Link from 'next/link';
import styles from './trend.module.css';
import { Hashtag } from '@/model/Hashtag';

type TrendType = {
    trend: Hashtag;
};

export default function Trend({ trend }: TrendType) {
    return (
        <Link href={`/search?q=${trend.title}`} className={styles.container}>
            <div className={styles.count}>실시간 트렌드</div>
            <div className={styles.title}>{trend.title}</div>
            <div className={styles.count}>{trend.count.toLocaleString()} posts</div>
        </Link>
    );
}
