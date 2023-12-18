"use client";
import { useRouter } from "next/navigation";
import styles from "../../page.module.css";
import Image from "next/image";
import Link from "next/link";
import xLogo from "../../../../public/xlogo.png";

export default function Login() {
  // v13의 redirect 기능
  // 서버에서 redirect 해주는것
  // redirect("/i/flow/login");

  const router = useRouter();
  router.replace("/i/flow/login");
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

// replace 사용시 뒤로가기하면 메인페이지로 바로 이동
// push는 뒤로가면 localhost:3000/login으로 이동
