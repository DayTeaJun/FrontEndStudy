import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import DiaryForm from './DiaryForm';
import DiaryList from './DiaryList';
import styles from './Home.module.css';

export default function Home() {
  const { user } = useAuthContext();
  // collection 함수는 이름을 인자받는다(현재 사용중인 diary 인자 받음)
  // DB 의 query를 추가하여 문서의 uid와 로그인한 사용자의 uid가 같은지 확인
  const { documents, error } = useCollection('diary', ['uid', '==', user.uid]);

  return (
    <main className={styles.cont}>
      <aside className={styles.side_menu}>
        <DiaryForm uid={user.uid} />
      </aside>
      <ul className={styles.context_list}>
        {error && <strong>{error}</strong>}
        {documents && <DiaryList diaries={documents} />}
      </ul>
    </main>
  );
}
