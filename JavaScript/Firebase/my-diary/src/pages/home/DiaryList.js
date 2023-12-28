import styles from './Home.module.css';

export default function DiaryList({ diaries }) {
  return (
    <>
      {diaries.map((item) => {
        return (
          <li key={item.id}>
            <strong className={StyleSheet.title}>{item.title}</strong>
            <p className={StyleSheet.text}>{item.text}</p>
          </li>
        );
      })}
    </>
  );
}
