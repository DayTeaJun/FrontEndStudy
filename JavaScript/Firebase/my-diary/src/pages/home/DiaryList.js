import { useFirestore } from '../../hooks/useFirestore';
import styles from './Home.module.css';

export default function DiaryList({ diaries }) {
  const { deleteDocument } = useFirestore('diary');
  return (
    <>
      {diaries.map((item) => {
        return (
          <li key={item.id}>
            <strong className={StyleSheet.title}>{item.title}</strong>
            <p className={StyleSheet.text}>{item.text}</p>
            <button
              type="button"
              onClick={() => {
                deleteDocument(item.id);
              }}
            >
              삭제
            </button>
          </li>
        );
      })}
    </>
  );
}
