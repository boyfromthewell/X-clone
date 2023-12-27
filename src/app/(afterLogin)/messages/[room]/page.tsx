import { faker } from "@faker-js/faker";
import relativeTime from "dayjs/plugin/relativeTime";
import styles from "./chatRoom.module.css";
import Link from "next/link";
import BackButton from "../../_component/BackButton";
import cx from "classnames";
import dayjs from "dayjs";

import "dayjs/locale/ko";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function ChatRoom() {
  const user = {
    id: "hero",
    nickname: "영웅",
    image: faker.image.avatar(),
  };

  const messages = [
    {
      messageId: 1,
      roomId: 123,
      id: "calmdownman",
      content: "침하하하하하하",
      createdAt: new Date(),
    },
    {
      messageId: 2,
      roomId: 123,
      id: "hero",
      content: "do or die",
      createdAt: new Date(),
    },
  ];

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <BackButton />
        <div>
          <h2>{user.nickname}</h2>
        </div>
      </div>
      <Link href={user.nickname} className={styles.userInfo}>
        <img src={user.image} alt={user.id} />
        <div>
          <b>{user.nickname}</b>
        </div>
        <div>@{user.id}</div>
      </Link>
      <div className={styles.list}>
        {messages.map((m) => {
          if (m.id === "calmdownman") {
            return (
              <div
                key={m.messageId}
                className={cx(styles.message, styles.myMessage)}
              >
                <div className={styles.content}>{m.content}</div>
                <div className={styles.date}>
                  {dayjs(m.createdAt).format("YYYY년 MM월 DD일 A HH시 mm분")}
                </div>
              </div>
            );
          }
          return (
            <div
              key={m.messageId}
              className={cx(styles.message, styles.yourMessage)}
            >
              <div className={styles.content}>{m.content}</div>
              <div className={styles.date}>
                {dayjs(m.createdAt).format("YYYY년 MM월 DD일 A HH시 mm분")}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
