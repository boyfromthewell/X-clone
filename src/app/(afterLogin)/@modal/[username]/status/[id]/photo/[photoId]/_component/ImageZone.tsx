'use client';

import ActionButtons from '@/app/(afterLogin)/_component/ActionButtons';
import styles from '../photoModal.module.css';
import { useQuery } from '@tanstack/react-query';
import { Post as IPost } from '@/model/Post';
import { getSinglePost } from '@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost';

export default function ImageZone({ id }: { id: string }) {
    const { data: post, error } = useQuery<IPost, Object, IPost, [_1: string, _2: string]>({
        queryKey: ['posts', id],
        queryFn: getSinglePost,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });

    if (!post?.Images[0]) return null;
    return (
        <div className={styles.imageZone}>
            <img src={post?.Images[0].link} alt={post?.content} />
            <div className={styles.image} style={{ backgroundImage: `url(${post.Images[0].link})` }} />
            <div className={styles.buttonZone}>
                <div className={styles.buttonInner}>
                    <ActionButtons white />
                </div>
            </div>
        </div>
    );
}
