'use client';
import { signOut, useSession } from 'next-auth/react';
import styles from './logoutButton.module.css';
import { useRouter } from 'next/navigation';
import { Session } from '@auth/core/types';
import { QueryClient, useQueryClient } from '@tanstack/react-query';

type Props = {
    me: Session;
};

export default function LogoutButton({ me }: Props) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const handleClickLogout = () => {
        queryClient.invalidateQueries({
            queryKey: ['posts'],
        });
        queryClient.invalidateQueries({
            queryKey: ['users'],
        });
        signOut({ redirect: false }).then(() => {
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
                method: 'post',
                credentials: 'include',
            });
            router.replace('/');
        });
    };

    if (!me?.user) return null;

    return (
        <button className={styles.logOutButton} onClick={handleClickLogout}>
            <div className={styles.logOutUserImage}>
                <img src={me.user?.image as string} alt={me.user?.email as string} />
            </div>
            <div className={styles.logOutUserName}>
                <div>{me.user?.name}</div>
                <div>@{me.user?.email}</div>
            </div>
        </button>
    );
}
