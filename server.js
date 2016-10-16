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
var cookieParser = require('cookie-parser')
//导入文件
require('./db');
var mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/justForYou");
//加密
var utils =require('./utils/md5');
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

app.post('/register',function (req,res) {
    var user = req.body;
    user.token = utils.md5(user.password + 'justForYou');
    Model('User').findOne({username: user.username,}, function (err, doc) {
        if (err) {
            res.send('注册失败');
        } else if (doc) {
            res.send({id: 2, content: '用户名已存在'});
        } else {
            Model('User').findOne({email: user.email}, function (err, doc) {
                if (err) {
                    res.send('注册失败');
                } else if (doc) {
                    res.send({id: 3, content: '邮箱已被使用'});
                } else {
                    Model('User').create(user, function (err, doc) {
                        if (err) {
                            res.send('注册失败')
                        } else {
                            var data = {id: 1, content: user.token}
                            console.log(data)
                            res.send(data);
                        }
                    })
                }
            })
        }
    })
})

app.post('/login',function (req,res) {
    var user = req.body;
    Model('User').findOne(user,function (err,doc) {
        if(err){
            res.send({id:0,content:err});
        }else{
            if(doc){
                res.send({id:1,content:doc.token})
            }
        }
    })
})





app.listen('5566',function () {
    console.log('listen 5566 port')
})





