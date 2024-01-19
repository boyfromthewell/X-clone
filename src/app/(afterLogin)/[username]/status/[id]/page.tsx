import BackButton from '@/app/(afterLogin)/_component/BackButton';
import styles from './singlePost.module.css';
import CommentForm from './_component/CommentForm';
import SinglePost from './_component/SinglePost';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { getSinglePost } from './_lib/getSinglePost';
import { getComments } from './_lib/getComments';
import Comments from './_component/Comments';

type PageProps = {
    params: { id: string };
};

export default async function Page({ params }: PageProps) {
    const { id } = params;

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({ queryKey: ['posts', id], queryFn: getSinglePost });
    await queryClient.prefetchQuery({ queryKey: ['posts', id, 'comments'], queryFn: getComments });
    const dehydratedState = dehydrate(queryClient);

    return (
        <div className={styles.main}>
            <HydrationBoundary state={dehydratedState}>
                <div className={styles.header}>
                    <BackButton />
                    <h3 className={styles.headerTitle}>게시하기</h3>
                </div>
                <SinglePost id={id} />
                <CommentForm id={id} />
                <div>
                    <Comments id={id} />
                </div>
            </HydrationBoundary>
        </div>
    );
}
