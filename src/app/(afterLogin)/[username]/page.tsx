import BackButton from '../_component/BackButton';
import FollowButton from '../_component/FollowButton';
import Post from '../_component/Post';
import styles from './profile.module.css';

export default function Profile() {
    const user = {
        id: 'calmdownman',
        nickname: '침덩이',
        image: '/profile.png',
    };

    return (
        <main>
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
            <div>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </main>
    );
}
