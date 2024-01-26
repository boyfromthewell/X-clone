import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import PostForm from './_component/PostForm';
import Tab from './_component/Tab';
import TabProvider from './_component/TabProvider';
import styles from './home.module.css';
import { getPostRecommends } from './_lib/getPostRecommends';
import TabDecider from './_component/TabDecider';
import { Suspense } from 'react';
import Loading from './loading';
import TabDeciderSuspense from './_component/TabDeciderSuspense';

/* 
 page.tsx -> loading.tsx 에서 담당
 서버 Suspense -> fallback
 react-query -> isPending
*/

export default async function Home() {
    return (
        <main className={styles.main}>
            <TabProvider>
                <Tab />
                <PostForm />
                <Suspense fallback={<Loading />}>
                    <TabDeciderSuspense />
                </Suspense>
            </TabProvider>
        </main>
    );
}
