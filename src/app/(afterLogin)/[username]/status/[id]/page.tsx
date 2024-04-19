import BackButton from '@/app/(afterLogin)/_component/BackButton';
import styles from './singlePost.module.css';
import CommentForm from './_component/CommentForm';
import SinglePost from './_component/SinglePost';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { getComments } from './_lib/getComments';
import Comments from './_component/Comments';
import { getUserServer } from '../../_lib/getUserServer';
import { Metadata } from 'next';
import { User } from '@/model/User';
import { Post } from '@/model/Post';
import { getSinglePostServer } from './_lib/getSinglePostServer';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const user: User = await getUserServer({ queryKey: ['users', params.username] });
    const post: Post = await getSinglePostServer({ queryKey: ['posts', params.id] });
    return {
        title: `X에서 ${user.nickname} 님 : ${post.content}`,
        description: post.content,
    };
}

type PageProps = {
    params: { id: string; username: string };
};

export default async function Page({ params }: PageProps) {
    const { id } = params;

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({ queryKey: ['posts', id], queryFn: getSinglePostServer });
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
