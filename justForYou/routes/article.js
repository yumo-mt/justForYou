var express = require('express');
var router = express.Router();


router.post('/pulish',function (req,res) {
    var info = req.body;
    if(info.article){
        Model('Article').update({_id:info.article},{$set:{title:info.title,content:info.content}},function (err,result) {
            if(err){
                res.send(err)
            }else{
                res.send({title:1,content:'修改成功'})
            }
        })
    }else{
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
                        res.send({title:1,content:'发表成功'});
                    }
                }
            })
        })
    }
})
router.get('/fetchList',function (req,res) {
    var orderBy = 'createAt';
    var order = -1;
    var orderObj = {};
    orderObj[orderBy] = order;
    Model('Article').find().sort(orderObj).populate('user').exec(function (err,docs) {
        var acticleList=[];
        docs.forEach(function (item) {
            acticleList.push({
                title:item.title,
                content:item.content,
                createAt:item.createAt,
                user:{_id:item.user._id,avatar:item.user.avatar,username:item.user.username},
                _id:item._id,
                pv:item.pv,
                star:item.star,
                commentNum:item.comments.length,
            })
        })
        res.send(acticleList)
    })
})
router.get('/fetchArticle/:id',function (req,res) {
    var article_id=req.params.id;
    var article = {};
    Model('Article').findById(article_id).populate('user').populate('comments.user').exec(function (err,doc) {
        if(err){
            res.send(err)
        }else{
            if(doc){
                var comments = doc.comments;
                var commentsList = [];
                comments.forEach(function (item) {
                    commentsList.push({
                        username:item.user.username,
                        userId:item.user._id,
                        avatar:item.user.avatar,
                        createAt:item.createAt,
                        comment:item.content,
                    })
                })
                    article = {
                        title:doc.title,
                        content:doc.content,
                        createAt:doc.createAt,
                        pv : doc.pv,
                        article_id:doc._id,
                        author:{_id:doc.user._id,avatar:doc.user.avatar,username:doc.user.username},
                        comments:commentsList
                    }
                res.send({id:1,content:article})
            }
        }
    })
})

router.post('/giveStar',function (req,res) {
    var info  = req.body;
    var userid = info.userId;
    var articleId = info.articleId;
    Model('Article').findById(articleId,function (err,doc) {
        if(err){
            res.send(err)
        }else{
            var star = doc.star;
            for(var i=0;i<star.length;i++){
                if(star[i]==userid){
                    star.splice(i,1);
                    Model('Article').update({_id:articleId},{$set:{star:star}},function (err,result) {
                    if(err){
                        res.send(err)
                    }else{
                        res.send({title:0,content:'取消点赞'});
                    }
                })
                    return;
                }
            }
            star.push(userid);
            Model('Article').update({_id:articleId},{$set:{star:star}},function (err,result) {
                if(err){
                    res.send(err)
                }else{
                    res.send({title:1,content:'点赞成功'})
                }
            })
        }
    })
})
router.post('/comment',function (req,res) {
    var info = req.body;
    var articleId=info.articleId;
    var userId = info.userId;
    var comment = info.comment;
    var createAt = Date.now();
    Model('Article').update({_id:articleId},{
        $push:{comments:{user:userId,content:comment,createAt:createAt}}},function(err,newDoc){
        if(err){
            res.send(err);
        }else{
            res.send({title:1,content:'评论成功'})
        }
    })
});

module.exports = router;
