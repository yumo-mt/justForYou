var webpack = require('webpack')
var path = require('path')
var buildPath = path.resolve(__dirname,'build');
var nodeModulesPath = path.resolve(__dirname,'node_modules')

module.exports = {
    entry:path.resolve('src/app.js'),
    resolve:{extensions:["",".js",".jsx"]},
    // devtool:'source-map',
    output:{
        path:buildPath,
        filename:'bundle.js',
        chunkFilename:'js/[name].[chunkhash:5].js'
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            }
        }),
        //允许错误警告，但不停止编译
        new webpack.NoErrorsPlugin(),
    ],
    module:{
        loaders:[
            {
                test: /\.js$/, //正则，匹配到的文件后缀名
                loader: 'babel'
            },
            //加载css代码
            {
                test: /\.css/,
                loader: 'style!css'
            },
            //配置信息的参数“?limit=8192”表示将所有小于8kb的图片都转为base64形式(其实应该说超过8kb的才使用url-loader 来映射到文件，否则转为data url形式)
            {
                test: /\.(woff|woff2|ttf|svg|eot)$/,
                loader: "url?limit=10000"
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'url?limit=10000&name=img/[name].[hash].[ext]'
            },
        ]
    }
}