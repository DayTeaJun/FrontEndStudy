// 번들러가 브라우저에서 작동하게 함
const path = require("path");

module.exports = {
  target: "node",
  entry: path.resolve("./src/client.js"),
  // 번들 시작 지점 설정

  output: {
    filename: "bundle.js",
    path: path.resolve("./public"),
  },
  // 번들 결과물 및 위치 설정

  module: {
    rules: [
      {
        test: /\.js?$/, // .js가 포함된 것들
        loader: "babel-loader", // 바벨사용
        exclude: /node_modules/, // 건들지 말아야할것
        options: {
          presets: [
            "react", // 리액트를 변환할거임
            "stage-0", // 최신 자바스크립트로 사용할 수 있도록
            ["env", { target: { browsers: ["last 2 versions"] } }], // 어떤 환경에서 구동시키는지? browsers(모든 브라우저) : last 2 versions(현재 최신 브라우저보다 2번 이하 버전까지 지원하도록 함)
          ],
        },
      },
    ],
  },
};
