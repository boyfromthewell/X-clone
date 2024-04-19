import styles from './search.module.css';
import BackButton from '../_component/BackButton';
import Post from '../_component/Post';
import SearchForm from '../_component/SearchForm';
import Tab from './_component/Tab';
import SearchResult from './_component/SearchResult';
import { Metadata } from 'next';

type SearchProps = {
    searchParams: { q: string; f?: string; pf?: string };
};

export async function generateMetadata({ searchParams }: SearchProps): Promise<Metadata> {
    return {
        title: `${searchParams.q} - 검색 / X`,
        description: `${searchParams.q} - 검색 / X`,
    };
}

export default function Search({ searchParams }: SearchProps) {
    return (
        <main className={styles.main}>
            <div className={styles.searchTop}>
                <div className={styles.searchZone}>
                    <div className={styles.buttonZone}>
                        <BackButton />
                    </div>
                    <div className={styles.formZone}>
                        <SearchForm q={searchParams.q} />
                    </div>
                </div>
                <Tab />
            </div>
            <div className={styles.list}>
                <SearchResult searchParams={searchParams} />
            </div>
        </main>
    );
}
