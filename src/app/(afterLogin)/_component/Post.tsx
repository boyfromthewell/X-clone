import Link from 'next/link';
import styles from './post.module.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import ActionButtons from './ActionButtons';
import PostArticle from './PostArticle';
import PostImages from './PostImages';
import { Post } from '@/model/Post';
import { MouseEventHandler } from 'react';

dayjs.locale('ko');
dayjs.extend(relativeTime);

type PostType = {
    noImage?: boolean;
    post: Post;
};

export default function Post({ noImage, post }: PostType) {
    const stopPropagation: MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.stopPropagation();
    };
    return (
        <PostArticle post={post}>
            <div className={styles.postWrapper}>
                <div className={styles.postUserSection}>
                    <Link href={`/${post.User.id}`} className={styles.postUserImage} onClick={stopPropagation}>
                        <img src={post.User.image} alt={post.User.nickname} />
                        <div className={styles.postShade} />
                    </Link>
                </div>
                <div className={styles.postBody}>
                    <div className={styles.postMeta}>
                        <Link href={`/${post.User.id}`} onClick={stopPropagation}>
                            <span className={styles.postUserName}>{post.User.nickname}</span>
                            &nbsp;
                            <span className={styles.postUserId}>@{post.User.id}</span>
                            &nbsp; · &nbsp;
                        </Link>
                        <span className={styles.postDate}>{dayjs(post.createdAt).fromNow(true)}</span>
                    </div>
                    <div>{post.content}</div>
                    {!noImage && (
                        <div>
                            <PostImages post={post} />
                        </div>
                    )}
                    <ActionButtons postId={post.postId} />
                </div>
            </div>
        </PostArticle>
    );
}
