"use client";
import { ReactNode } from "react";
import styles from "./post.module.css";
import { useRouter } from "next/navigation";

type PostArticleProps = {
  children: ReactNode;
  post: {
    postId: number;
    content: string;
    User: {
      id: string;
      nickname: string;
      image: string;
    };
    createdAt: Date;
    Images: string[];
  };
};

export default function PostArticle({ children, post }: PostArticleProps) {
  const router = useRouter();

  const onClick = () => {
    router.push(`/${post.User.id}/status/${post.postId}`);
  };

  return (
    <article onClickCapture={onClick} className={styles.post}>
      {children}
    </article>
  );
}
