'use client';
import { useContext } from 'react';
import styles from './tab.module.css';
import { TabContext } from './TabProvider';

export default function Tab() {
    const { tab, setTab } = useContext(TabContext);

    const handleClickRec = () => {
        setTab('rec');
    };

    const handleClickFol = () => {
        setTab('fol');
    };

    return (
        <div className={styles.homeFixed}>
            <div className={styles.homeText}>홈</div>
            <div className={styles.homeTab}>
                <div onClick={handleClickRec}>
                    추천
                    <div className={styles.tabIndicator} hidden={tab === 'fol'}></div>
                </div>
                <div onClick={handleClickFol}>
                    팔로우 중<div className={styles.tabIndicator} hidden={tab === 'rec'}></div>
                </div>
            </div>
        </div>
    );
}
