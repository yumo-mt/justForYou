var express = require('express');
var router = express.Router();


router.post('/pulish',function (req,res) {
    var info = req.body;
    info.createAt = Date.now();
    info.user = info.token;
    delete info.token;
    Model('User').findById(info.user,function (err,doc) {
        if(err){
            res.send(err);
            return;
        }else{
             info.username = doc.username;
        }
        Model('Acticle').create(info,function (err,doc) {
            if(err){
                res.send(err)
            }else{
                if(doc){
                    res.send({title:'发表成功',content:''});
                }
            }
        })
    })
})
router.get('/fetchList',function (req,res) {
    Model('Acticle').find().populate('user').exec(function (err,docs) {
        var acticleList=[];
        docs.forEach(function (item) {
            acticleList.push({
                title:item.title,
                content:item.content,
                createAt:item.createAt,
                user:{_id:item.user._id,avatar:item.user.avatar,username:item.user.username},
                _id:item._id,
                pv:item.pv,
            })
        })
        res.send(acticleList)
    })
})


module.exports = router;
