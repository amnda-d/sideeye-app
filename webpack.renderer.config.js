const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  // module: {
  // rules: [
  // { test: /\.tsx?$/, loader: "ts-loader" }
  // {
  //   test: /\.css$/,
  //   use: ['style-loader', 'css-loader?-url'],
  // },
  // ]
  // },
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    extensions: [".ts", ".tsx"],
    modules: ["node_modules"],
    alias: {
      renderer: path.resolve(__dirname, "src/renderer")
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/renderer/index.html")
    })
  ]
};
