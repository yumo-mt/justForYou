var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var settings = require('../settings');
mongoose.connect(settings.url);
//用户信息和发表的文章
mongoose.model('User',new mongoose.Schema({
    username:{type:String,isRequired:true},
    password:{type:String,isRequired:true},
    email:{type:String,isRequired:true},
    //本来以为需要存个token的,后来想到默认的_id就是啊
    // token:{type:String,isRequired:true},
    list:{type:Object,default:[]},
    avatar:{type:String,default:'http://www.qdaily.com/images/missing_face.png'}//头像
}))

//列表Model
mongoose.model('Article',new mongoose.Schema({
    // id:{type:String,isRequired:true},
    title:{type:String,isRequired:true},    //标题
    content:{type:String,isRequired:true},  //内容
    createAt:{type:String,isRequired:true},
    pv:{type:Number,default:0},
    user:{type:ObjectId,ref:'User'},
    username:{type:String,isRequired:true}
}))
//在程序的任何地方都可以调用此方法,设置为全局
global.Model = function (modelName) {
    return mongoose.model(modelName)
}

