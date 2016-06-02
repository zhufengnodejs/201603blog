var mongoose = require('mongoose');
//1. 连接数据库
mongoose.connect('mongodb://123.57.143.189:27017/zhufengnodejsblog');
//2. 定义schema
var userSchema = new mongoose.Schema({
    username:{type:String},//用户名
    password:{type:String},//密码
    email:{type:String}, //邮箱
    avatar:{type:String} //头像
});
var articleSchema = new mongoose.Schema({
    title:{type:String},//标题
    content:{type:String},//正文
    createAt:{type:Date,default:new Date()}, //发表时间
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'} //作者 ref代表这个ID引用的是哪个模型的ID
});
//3. 定义模型
var userModel = mongoose.model('user',userSchema);
var articleModel = mongoose.model('article',articleSchema);

//导出用户模型
module.exports = {
    user:userModel,
    article:articleModel
}
