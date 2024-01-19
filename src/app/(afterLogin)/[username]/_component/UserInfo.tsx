'use client';
import styles from '../profile.module.css';
import BackButton from '../../_component/BackButton';
import FollowButton from '../../_component/FollowButton';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/model/User';
import { getUser } from '../_lib/getUser';

export default function UserInfo({ username }: { username: string }) {
    const { data: user, error } = useQuery<User, Object, User, [_1: string, _2: string]>({
        queryKey: ['users', username],
        queryFn: getUser,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });

    if (error)
        return (
            <>
                <div className={styles.header}>
                    <BackButton />
                    <h3 className={styles.headerTitle}>프로필</h3>
                </div>
                <div className={styles.userZone}>
                    <div className={styles.userImage}></div>
                    <div className={styles.userName}>
                        <div>@{username}</div>
                    </div>
                </div>
                <div
                    style={{
                        fontSize: 31,
                        fontWeight: 'bold',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 100,
                    }}
                >
                    계정이 존재하지 않음
                </div>
            </>
        );

    if (!user) return null;

    return (
        <>
            <div className={styles.header}>
                <BackButton />
                <h3 className={styles.headerTitle}>{user.nickname}</h3>
            </div>
            <div className={styles.userZone}>
                <div className={styles.userImage}>
                    <img src={user.image} alt={user.id} />
                </div>
                <div className={styles.userName}>
                    <div>{user.nickname}</div>
                    <div>@{user.id}</div>
                </div>
                <FollowButton />
            </div>
        </>
    );
}
