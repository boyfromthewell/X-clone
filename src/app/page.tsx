import Image from "next/image";
import Link from "next/link";
import xLogo from "../../public/xlogo.png";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.left}>
        <Image src={xLogo} alt="logo" width={308} height={308} />
      </div>
      <div className={styles.right}>
        <h1>지금 일어나고 있는 일</h1>
        <h2>지금 가입하세요.</h2>
        <Link href="/i/flow/signup" className={styles.signup}>
          계정 만들기
        </Link>
        <h3>이미 트위터에 가입하셨나요?</h3>
        <Link href="/login" className={styles.login}>
          로그인
        </Link>
      </div>
    </>
  );
}
