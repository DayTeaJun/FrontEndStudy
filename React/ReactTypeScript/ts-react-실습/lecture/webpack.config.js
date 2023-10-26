const path = require("path");
const webpack = require("webpack");

// dist/app.js에서 만들 결과물
module.exports = {
  mode: "development", // production
  devtool: "eval", // hidden-source-map hidden이 아니면 소스가 노출됨
  resolve: {
    extensions: [".jsx", ".js", ".tsx", ".ts"],
  },
  entry: {
    app: "./client",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader", // webpack과 타입스크립트 연결해줌 옛날 문법으로 변환
      },
    ],
  },
  plugins: [],
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist"),
  },
};
