import { redirect } from "next/navigation";

export default function Login() {
  // v13의 redirect 기능
  redirect("/i/flow/login");
}
