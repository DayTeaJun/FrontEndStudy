const express = require("express");
// require은 노드 문법으로 express를 로딩함 (클라이언트 사이드 렌더링의 import와 같음)
// 위 방식을 commonJS 방식이라 부름

const app = express();
// express 서버를 실행 , 인스턴스를 만든 app으로 express의 여러 메서드를 사용하기 위함
const react = require("react");
const renderToString = require("react-dom/server").renderToString;
// react-dom에서 '/server'는 서버사이드에서 불러오는 메서드(여기서는 renderToString)들을 불러옴
// 서버사이드 렌더링에서 문자열을 보내면 HTML으로 읽어줌
const Home = require("./components/Home.js");

app.get("/", (req, res) => {
  const content = renderToString(<Home />);
  // Home 컴포넌트를 문자열로 바꾼다음 content에 담음

  res.send(content);
}); // '/' 주소로 요청하면 콜백{}을 실행 시켜줌, 인자()는 requset, response를 받음

app.listen(3000, () => {
  console.log("3000번 포트가 열렸습니다.");
}); // 서버가 port를 여는 메서드
