import { ReactNode } from "react";
import styles from "../../app/(beforeLogin)/_component/main.module.css";

interface LayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

export default function Layout({ children, modal }: LayoutProps) {
  return (
    <div className={styles.container}>
      {children}
      {modal}
    </div>
  );
}

// 주소가 localhost:3000 일때는 children -> page.tsx, modal -> @modal/default.tsx
// 주소가 localhost:3000/i/flow/login 일떄는 children -> i/flow/login/page.tsx, modal -> @modal/i/flow/login/page.tsx
