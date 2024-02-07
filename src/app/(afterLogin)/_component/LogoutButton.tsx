'use client';
import { signOut, useSession } from 'next-auth/react';
import styles from './logoutButton.module.css';
import { useRouter } from 'next/navigation';
import { Session } from '@auth/core/types';

type Props = {
    me: Session;
};

export default function LogoutButton({ me }: Props) {
    const router = useRouter();

    const handleClickLogout = () => {
        signOut({ redirect: false }).then(() => {
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
