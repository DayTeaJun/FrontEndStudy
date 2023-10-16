const fs = require("fs");
fs.mkdirSync("dist");
// index.html 파일 만들기
// 터미널에 node index.js 하면 아래의 index.html 파일이 나옴
// 이 과정이 npm run build와 비슷한 내용
// 즉, html이 없었지만 어떤 스크립트를 실행하면 html, css, js 등으로 바꿔지는 작업
// 빌드를 하고, 어디에 생성하여 작업을 할지를 정할 수 있음
fs.writeFileSync(
  "dist/index.html",
  `
  <head>
    <title></title>
  </head>
  <body>
    <!-- npx static-server 로 localhost 실행 -->
    <!-- 실제 웹 환경을 생각해서 개발을 하기위해 로컬호스트 로 실행 -->
    <!-- 번들러는 직접해야 할 것들을 쉽게 할 수 있도록 함, CSS를 Sass나 tailwind 등으로 사용하게 해주고, React의 JSX파일을 실제 브라우저가 알 수 있게 JS로 변경해주기도 함.(트랜스파일러) -->
    <!-- 즉, 브라우저가 알 수 있게 해주고, 여러개를 하나로 묶어주는 것 -->
    <h1>hello world</h1>
  </body>
</html>
`
);
