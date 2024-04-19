import styles from './explore.module.css';
import SearchForm from '../_component/SearchForm';
import TrendSection from './_component/TrendSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '탐색하기 / X',
    description: '탐색해보세요.',
};

export default function Explore() {
    return (
        <main className={styles.main}>
            <div className={styles.formZone}>
                <SearchForm />
            </div>
            <div className={styles.trend}>
                <h3>나를 위한 트렌드</h3>
                <TrendSection />
            </div>
        </main>
    );
}
