"use client";
import { useRouter } from "next/navigation";
import Main from "../_component/Main";

export default function Login() {
  // v13의 redirect 기능
  // 서버에서 redirect 해주는것
  // redirect("/i/flow/login");

  const router = useRouter();
  router.replace("/i/flow/login");
  return <Main />;
}

// replace 사용시 뒤로가기하면 메인페이지로 바로 이동
// push는 뒤로가면 localhost:3000/login으로 이동
