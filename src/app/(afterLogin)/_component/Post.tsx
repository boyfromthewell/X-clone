import Link from "next/link";
import styles from "./post.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { faker } from "@faker-js/faker";
import ActionButtons from "./ActionButtons";
import PostArticle from "./PostArticle";
import PostImages from "./PostImages";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function Post({ noImage }: { noImage?: boolean }) {
  const target = {
    postId: 1,
    User: {
      id: "joopearl",
      nickname: "socksman",
      image: "/temp.png",
    },
    content: "아기가 치즈를 참 좋아하나봐요^^",
    createdAt: new Date(),
    Images: [] as any,
  };

  if (Math.random() > 0.5 && !noImage) {
    target.Images.push(
      { imageId: 1, link: faker.image.urlLoremFlickr() },
      { imageId: 2, link: faker.image.urlLoremFlickr() },
      { imageId: 3, link: faker.image.urlLoremFlickr() },
      { imageId: 4, link: faker.image.urlLoremFlickr() }
    );
  }

  return (
    <PostArticle post={target}>
      <div className={styles.postWrapper}>
        <div className={styles.postUserSection}>
          <Link href={`/${target.User.id}`} className={styles.postUserImage}>
            <img src={target.User.image} alt={target.User.nickname} />
            <div className={styles.postShade} />
          </Link>
        </div>
        <div className={styles.postBody}>
          <div className={styles.postMeta}>
            <Link href={`/${target.User.id}`}>
              <span className={styles.postUserName}>
                {target.User.nickname}
              </span>
              &nbsp;
              <span className={styles.postUserId}>@{target.User.id}</span>
              &nbsp; · &nbsp;
            </Link>
            <span className={styles.postDate}>
              {dayjs(target.createdAt).fromNow(true)}
            </span>
          </div>
          <div>{target.content}</div>
          <div>
            <PostImages post={target} />
          </div>
          <ActionButtons />
        </div>
      </div>
    </PostArticle>
  );
}
