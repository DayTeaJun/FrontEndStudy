// const express = require("express");
// require은 노드 문법으로 express를 로딩함 (클라이언트 사이드 렌더링의 import와 같음)
// 위 방식을 commonJS 방식이라 부름

// const React = require("react");
// const renderToString = require("react-dom/server").renderToString;
// // react-dom에서 '/server'는 서버사이드에서 불러오는 메서드(여기서는 renderToString)들을 불러옴
// // 서버사이드 렌더링에서 문자열을 보내면 HTML으로 읽어줌
// const Home = require("./components/Home.js");

// commonJS와 import 문법 GPT설명
// Node.js의 버전 14 이전까지는 CommonJS가 기본 모듈 시스템으로 사용되었습니다.
// 이 코드는 import 문을 사용하며, 이는 ES 모듈 방식으로 모듈을 불러오는 방법입니다. ES 모듈은 ECMAScript 6 (ES6)에서 도입된 표준화된 모듈 시스템으로, import와 export 문을 사용하여 모듈 간의 의존성을 관리할 수 있도록 해줍니다.
import express from "express";
const app = express();
// express 서버를 실행 , 인스턴스를 만든 app으로 express의 여러 메서드를 사용하기 위함
import React from "react";
import { renderToString } from "react-dom/server";
import Home from "./components/Home";

app.use(express.static("public"));
// express static 메서드 정적으로 public 파일을 전달해주는 메서드
app.get("/", (req, res) => {
  //   const content = renderToString(<Home />);
  // Home 컴포넌트를 문자열로 바꾼다음 content에 담음
  const html = `
    <html>
        <head></head>
        <body>
            <div id="root"><div>
            <script src="bundle.js"></script>
        </body>
    </html>
  `;
  // 실제로 렌더링할 때 bundle.js와 html을 연결해줌

  // client.js에서 root에 넣어줬으므로 위에 만든 content는 필요없다.
  res.send(html);
}); // '/' 주소로 요청하면 콜백{}을 실행 시켜줌, 인자()는 requset, response를 받음

app.listen(3000, () => {
  console.log("3000번 포트가 열렸습니다.");
}); // 서버가 port를 여는 메서드

// 서버 여는 명령어 (하나씩 터미널 열어서 순서대로 실행)
// "build-server": "webpack --config webpack.server.js --watch" --watch로 계속 감시
// "build-client": "webpack --config webpack.client.js --watch"
// "start-server": "nodemon --watch build --exec node build/bundle.js"
// nodemon으로 위에 감시를 하면서, 업데이트되면 자동으로 재실행함
