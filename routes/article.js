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
        Model('Article').create(info,function (err,doc) {
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
    Model('Article').find().populate('user').exec(function (err,docs) {
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
router.get('/fetchArticle/:id',function (req,res) {
    var article_id=req.params.id;
    Model('Article').findById(article_id).populate('user').exec(function (err,doc) {
        if(err){
            res.send(err)
        }else{
            if(doc){
                    var article = {};
                    article = {
                        title:doc.title,
                        content:doc.content,
                        createAt:doc.createAt,
                        pv : doc.pv,
                        article_id:doc._id,
                        author:{_id:doc.user._id,avatar:doc.user.avatar,username:doc.user.username},
                    }
                res.send({id:1,content:article})
            }
        }
    })

})


module.exports = router;
