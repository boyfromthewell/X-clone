"use client";
import styles from "./followRecommend.module.css";

export default function FollowRecommend() {
  const handleClickFollow = () => {};

  const user = {
    id: "chadoljjambbong",
    nickname: "철면수심",
    image: "/profile2.jpg",
  };

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
