const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: {
    SharePlace: "./src/SharePlace.js",
    MyPlace: "./src/MyPlace.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist", "assets", "scripts"),
    publicPath: "/dist/assets/scripts",
  },
  devtool: "cheap-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin.CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "!index.*.html"], // Clean all files except index.*.html
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "../index.[contenthash].html",
      chunks: ["SharePlace"]
    }),
    new HtmlWebpackPlugin({
      template: "./src/my-place.html",
      filename: "../my-place.[contenthash].html",
      chunks: ["MyPlace"], // Include only MyPlace chunk in my-place.html
    }),
    new MiniCssExtractPlugin({
      filename: "../styles/[name].[contenthash].css", // Output CSS files to dist/assets/styles
    }),
  ],
};
