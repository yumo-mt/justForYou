const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var OpenBrowserPlugin = require('open-browser-webpack-plugin');


module.exports = {
  // 配置页面入口js文件
  entry: [
    'react-hot-loader/patch', // RHL patch
    './noReduxsrc/app.js'
  ],

  output: {
    path: resolve(__dirname, './build'),
    filename: '[name].[chunkhash:8].index.js',
    chunkFilename: '[name].[chunkhash:8].index.js',
  },

  module: {

    rules: [
      {
        test: /\.(js|jsx)$/,
        // 排除node_modules目录下的文件, npm安装的包不需要编译
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

  /*
   配置webpack插件
   plugin和loader的区别是, loader是在import时根据不同的文件名, 匹配不同的loader对这个文件做处理,
   而plugin, 关注的不是文件的格式, 而是在编译的各个阶段, 会触发不同的事件, 让你可以干预每个编译阶段.
   */
  plugins: [
    /*
     html-webpack-plugin用来打包入口html文件
     entry配置的入口是js文件, webpack以js文件为入口, 遇到import, 用配置的loader加载引入文件
     但作为浏览器打开的入口html, 是引用入口js的文件, 它在整个编译过程的外面,
     所以, 我们需要html-webpack-plugin来打包作为入口的html文件
     */
    new HtmlWebpackPlugin({
      /*
       template参数指定入口html文件路径, 插件会把这个文件交给webpack去编译,
       webpack按照正常流程, 找到loaders中test条件匹配的loader来编译, 那么这里html-loader就是匹配的loader
       html-loader编译后产生的字符串, 会由html-webpack-plugin储存为html文件到输出目录, 默认文件名为index.html
       可以通过filename参数指定输出的文件名
       html-webpack-plugin也可以不指定template参数, 它会使用默认的html模板.
       */
      template: './noReduxsrc/index.html',
      filename: 'index.html'
    }),
    new OpenBrowserPlugin({url: 'http://localhost:8800'})
  ],
  //用于定位开发环境中的错误
  devtool: 'eval-source-map',
  /*
   配置开发时用的服务器, 让你可以用 http://127.0.0.1:8080/ 这样的url打开页面来调试
   并且带有热更新的功能, 打代码时保存一下文件, 浏览器会自动刷新. 比nginx方便很多
   如果是修改css, 甚至不需要刷新页面, 直接生效. 这让像弹框这种需要点击交互后才会出来的东西调试起来方便很多.
   */
  devServer: {
    // 配置监听端口, 因为8080很常用, 为了避免和其他程序冲突, 我们配个其他的端口号
    port: 8800,
    //可以ip访问，通常用于同网测试使用
    host: "0.0.0.0",
    disableHostCheck: true,
    historyApiFallback: true
  }
}