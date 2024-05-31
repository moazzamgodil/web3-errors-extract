const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
//   entry: {
//     app: './src/index.js',
//   },
  plugins: [
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({ title: "Titled Document" }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};