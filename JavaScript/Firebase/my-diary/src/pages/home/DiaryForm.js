import { useState } from "react";

export default function DiaryForm() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleData = (e) => {
    if (e.target.id === "title") {
      setTitle(e.target.value);
    } else if (e.target.id === "txt") {
      setText(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, text);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>일기 쓰기</legend>
          <label htmlFor="title">일기 제목 : </label>
          <input id="title" type="text" required onChange={handleData} />

          <label htmlFor="txt">일기 내용 : </label>
          <textarea id="txt" type="text" required onChan ge={handleData} />

          <button type="submit">저장하기</button>
        </fieldset>
      </form>
    </>
  );
}
