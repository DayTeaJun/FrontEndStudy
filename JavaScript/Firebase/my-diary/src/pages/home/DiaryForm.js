import { useEffect, useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';

// DiaryForm이 실행될때 props로 유저의 id를 전달받음
export default function DiaryForm({ uid }) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  // useFireStore의 인자값은 collection의 이름
  const { addDocument, response } = useFirestore('diary');

  const handleData = (e) => {
    if (e.target.id === 'title') {
      setTitle(e.target.value);
    } else if (e.target.id === 'txt') {
      setText(e.target.value);
    }
  };

  useEffect(() => {
    if (response.success) {
      setTitle('');
      setText('');
    }
  }, [response.success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, text);
    // uid는 작성한 유저의 id
    addDocument({ uid, title, text });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>일기 쓰기</legend>
          <label htmlFor="title">일기 제목 : </label>
          <input
            id="title"
            type="text"
            value={title}
            required
            onChange={handleData}
          />

          <label htmlFor="txt">일기 내용 : </label>
          <textarea
            id="txt"
            type="text"
            value={text}
            required
            onChange={handleData}
          />

          <button type="submit">저장하기</button>
        </fieldset>
      </form>
    </>
  );
}
