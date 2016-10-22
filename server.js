var express = require('express');
var path = require('path');
var app = express();
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
//配置文件
var settings = require('./settings');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//解析cookie req.cookie
var cookieParser = require('cookie-parser');
app.use(express.static(__dirname));
//导入文件
require('./db');
var mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/justForYou");
//加密
var utils =require('./utils/md5');
var user = require('./routes/user');
var article = require('./routes/article');
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    //
    res.header("Access-Control-Allow-Headers", "content-type");
    //
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// app.use(bodyParser.json({ 'type':'*/*'}));
// parse application/json
app.use(bodyParser.json())

app.use('*',function (req,res,next) {
    next();
})
app.use('/user', user);
app.use('/article', article);


app.listen('5566',function () {
    console.log('listen 5566 port')
})




