import Link from "next/link";
import styles from "./trend.module.css";

export default function Trend() {
  return (
    <Link href={`/search?q=침덩이`} className={styles.container}>
      <div className={styles.count}>실시간 트렌드</div>
      <div className={styles.title}>침덩이</div>
      <div className={styles.count}>55 posts</div>
    </Link>
  );
}
