var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin');
var openBrowserWebpackPlugin = require('open-browser-webpack-plugin');
module.exports = {
  entry: path.resolve('noReduxsrc/app.js'),
  output: {
    path: './build',
    filename: 'bundle.js',
    chunkFilename: 'js/[name].[chunkhash:5].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack',
      template: './noReduxsrc/index.html',
      filename: 'index.html'
    }),
    new openBrowserWebpackPlugin({url: 'http://localhost:8800'})
  ],
  devServer: {
    port: 8800,
    contentBase: './build',
    inline: true,
    stats: {
      colors: true,
      cached: false,
    },
    host: "0.0.0.0",
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/, //正则，匹配到的文件后缀名
        loader: 'babel-loader',
        options:{
          presets:["es2015",'react']
        }
      },
      //加载css代码
      {
        test: /\.css$/,
        use:[
          "style-loader",
          "css-loader",
        ]
      },
      //配置信息的参数“?limit=8192”表示将所有小于8kb的图片都转为base64形式(其实应该说超过8kb的才使用url-loader 来映射到文件，否则转为data url形式)
      {
        /*
         匹配各种格式的图片和字体文件
         上面html-loader会把html中<img>标签的图片解析出来, 文件名匹配到这里的test的正则表达式,
         css-loader引用的图片和字体同样会匹配到这里的test条件
         */
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,

        /*
         使用url-loader, 它接受一个limit参数, 单位为字节(byte)
         当文件体积小于limit时, url-loader把文件转为Data URI的格式内联到引用的地方
         当文件大于limit时, url-loader会调用file-loader, 把文件储存到输出目录, 并把引用的文件路径改写成输出后的路径
         比如 views/foo/index.html中
         <img src="smallpic.png">
         会被编译成
         <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAA...">
         而
         <img src="largepic.png">
         会被编译成
         <img src="/f78661bef717cf2cc2c2e5158f196384.png">
         */
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
  }
}

