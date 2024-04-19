import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import UserPosts from './_component/UserPosts';
import { getUserPosts } from './_lib/getUserPosts';
import UserInfo from './_component/UserInfo';
import { getUserServer } from './_lib/getUserServer';
import { auth } from '@/auth';
import { Metadata } from 'next';
import { User } from '@/model/User';

export async function generateMetadata({ params }: ProfileProps): Promise<Metadata> {
    const user: User = await getUserServer({ queryKey: ['users', params.username] });
    return {
        title: `${user.nickname} (${user.id}) / X`,
        description: `${user.nickname} (${user.id}) 프로필`,
    };
}

type ProfileProps = {
    params: { username: string };
};

export default async function Profile({ params }: ProfileProps) {
    const { username } = params;
    const queryClient = new QueryClient();
    const session = await auth();
    await queryClient.prefetchQuery({ queryKey: ['users', username], queryFn: getUserServer });
    await queryClient.prefetchQuery({ queryKey: ['posts', 'users', username], queryFn: getUserPosts });
    const dehydratedState = dehydrate(queryClient);

    return (
        <main>
            <HydrationBoundary state={dehydratedState}>
                <UserInfo username={username} session={session} />
                <div>
                    <UserPosts username={username} />
                </div>
            </HydrationBoundary>
        </main>
    );
}
