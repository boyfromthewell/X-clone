'use client';
import { useSession } from 'next-auth/react';
import styles from '../[username]/profile.module.css';
import { useRouter } from 'next/navigation';

export default function FollowButton() {
    const { data } = useSession();
    const router = useRouter();

    const handleClickFollow = () => {
        if (!data?.user) router.replace('/login');
    };
    return (
        <button className={styles.followButton} onClick={handleClickFollow}>
            팔로우
        </button>
    );
}
