'use client';
import { User } from '@/model/User';
import styles from './followRecommend.module.css';

type FollowRecommendProps = {
    user: User;
};

export default function FollowRecommend({ user }: FollowRecommendProps) {
    const handleClickFollow = () => {};

    return (
        <div className={styles.container}>
            <div className={styles.userLogoSection}>
                <div className={styles.userLogo}>
                    <img src={user.image} alt={user.id} />
                </div>
            </div>
            <div className={styles.userInfo}>
                <div className={styles.title}>{user.nickname}</div>
                <div className={styles.count}>@{user.id}</div>
            </div>
            <div className={styles.followButtonSection}>
                <button onClick={handleClickFollow}>팔로우</button>
            </div>
        </div>
    );
}
