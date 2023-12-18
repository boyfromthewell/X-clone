import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import styles from "./home.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <TabProvider>
        <Tab />
      </TabProvider>
    </main>
  );
}
