var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var settings = require('../settings');
mongoose.connect(settings.url);
//用户信息和发表的文章
mongoose.model('User',new mongoose.Schema({
    username:{type:String,isRequired:true},
    password:{type:String,isRequired:true},
    email:{type:String,isRequired:true},
    token:{type:String,isRequired:true},
    list:{type:Object,default:[]}
}))

//列表Model
mongoose.model('Acticle',new mongoose.Schema({
    title:{type:String,isRequired:true},    //标题
    content:{type:String,isRequired:true},  //内容
    createAt:{type:Date,default:Date.now()},
    pv:{type:Number,default:0},
    user:{type:ObjectId,ref:'User'}
}))
//在程序的任何地方都可以调用此方法,设置为全局
global.Model = function (modelName) {
    return mongoose.model(modelName)
}

