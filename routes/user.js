var express  = require('express');
var formidable = require('formidable');
var router = express.Router();
var path= require('path');
var fs = require('fs');

router.post('/register',function (req,res) {
    var user = req.body;
    // user.token = utils.md5(user.password + 'justForYou');
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
                            var data = {id: 1, content: doc._id}
                            res.send(data);
                        }
                    })
                }
            })
        }
    })
})

router.post('/login',function (req,res) {
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

router.post('/uploadAvatar',function (req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        var avatarPath = './upload/'+fields.token+files.avatar.name
        fs.createReadStream(files.avatar.path).pipe(fs.createWriteStream(avatarPath));
        avatarPath = avatarPath.substring(1);
        Model('User').update({_id:fields.token},{$set:{avatar:'http://localhost:5566'+avatarPath}},function (err,doc) {
            if(err){
                res.send(err)
            }else{
                if(doc){
                    res.send({title:1,content:'修改成功'})
                }
            }
        })

    })
    // form.on('end',function(){
    //     // res.send({aa:'aa'})
    // })
})

router.get('/getUserInfo',function (req,res) {

    var info = {};
    Model('User').findOne({_id:req.query.token},function (err,doc) {
        if(err){
            res.send({title:err,content:'服务器出错了'})
        }else{
            if(doc){
                info = {
                    username:doc.username,
                    avatar:doc.avatar,
                }
                res.send(info);
            }
        }

    })
})

module.exports = router;