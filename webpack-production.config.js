var HtmlWebpackPlugin = require('html-webpack-plugin');
var Edition = './noReduxsrc'
const {resolve} = require('path')
module.exports = {
  entry: [Edition + '/app.js'],
  output: {
    path: resolve(__dirname, './build'),
    filename: '[name].[chunkhash:8].index.js',
    chunkFilename: 'js/[name].[chunkhash:8].index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        // 匹配.css文件
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ]
      },
      {
        // 匹配.less文件
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: Edition + '/index.html',
      filename: 'index.html'
    }),
  ],

}