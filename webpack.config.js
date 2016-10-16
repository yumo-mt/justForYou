var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var openBrowserWebpackPlugin = require('open-browser-webpack-plugin');
module.exports = {
    entry:path.resolve('src/app.js'),
    output:{
        path:'./build',
        filename:'bundle.js'
    },
    resolve:{
        extensions:['','.js','.jsx','.css','.json'],
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'webpack',
            template:'./src/index.html',
            filename:'index.html'
        }),
        new openBrowserWebpackPlugin({url:'http://localhost:8800'})
    ],
    devServer:{
        port:8800,
        contentBase:'./build',
        inline:true,
        stats: {
            colors: true,
            cached: false,

        },
        host: "0.0.0.0"
    },
    module:{
        loaders:[
            {
                test: /\.js$/, //正则，匹配到的文件后缀名
                loader: 'babel'
            },

        ]
    }
}
