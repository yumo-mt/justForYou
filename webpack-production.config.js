var HtmlWebpackPlugin = require('html-webpack-plugin');
var Edition = './noReduxsrc'
const {resolve} = require('path')
module.exports = {
  entry: Edition + '/app.js',
  output: {
    // 打包输出目录
    path: resolve(__dirname, 'build'),
    // 入口js的打包输出文件名
    filename: 'bundle.js'
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
      template: Edition + '/index.html'
    }),
  ],

}