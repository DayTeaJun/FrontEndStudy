import DiaryForm from "./DiaryForm";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.cont}>
      <aside className={styles.side_menu}>
        <DiaryForm />
      </aside>
      <ul className={styles.context_list}>dairy list</ul>
    </main>
  );
}
