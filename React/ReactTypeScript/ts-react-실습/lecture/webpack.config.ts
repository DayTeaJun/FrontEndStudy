import path from "path";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

// dist/app.js에서 만들 결과물
const config: Configuration = {
  name: "word-relay-dev",
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
        loader: "ts-loader", // webpack과 타입스크립트 연결해줌 옛날 문법(JS)으로 변환
        exclude: path.join(__dirname, "node_modules"),
      },
      {
        loader: "babel-loader",
        options: { plugins: ["react-refresh/babel"] },
      },
    ],
  },
  plugins: [new ReactRefreshPlugin(), new ForkTsCheckerWebpackPlugin()],
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist"),
    publicPath: "/dist/",
  },
  devServer: {
    devMiddleware: { publicPath: "/dist" },
    static: { directory: path.resolve(__dirname) },
    hot: true,
  },
};

export default config;
