"use client";
import styles from "./logoutButton.module.css";

export default function LogoutButton() {
  const me = {
    id: "calmdownman",
    nickname: "침덩이",
    image: "/profile.png",
  };
  const handleClickLogout = () => {};

  return (
    <button className={styles.logOutButton} onClick={handleClickLogout}>
      <div className={styles.logOutUserImage}>
        <img src={me.image} alt={me.id} />
      </div>
      <div className={styles.logOutUserName}>
        <div>{me.nickname}</div>
        <div>@{me.id}</div>
      </div>
    </button>
  );
}
