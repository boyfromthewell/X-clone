import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import UserPosts from './_component/UserPosts';
import { getUserPosts } from './_lib/getUserPosts';
import UserInfo from './_component/UserInfo';
import { getUser } from './_lib/getUser';

type ProfileProps = {
    params: { username: string };
};

export default async function Profile({ params }: ProfileProps) {
    const { username } = params;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({ queryKey: ['users', username], queryFn: getUser });
    await queryClient.prefetchQuery({ queryKey: ['posts', 'users', username], queryFn: getUserPosts });
    const dehydratedState = dehydrate(queryClient);

    return (
        <main>
            <HydrationBoundary state={dehydratedState}>
                <UserInfo username={username} />
                <div>
                    <UserPosts username={username} />
                </div>
            </HydrationBoundary>
        </main>
    );
}
