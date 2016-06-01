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
//3. 定义模型
var userModel = mongoose.model('user',userSchema);

//导出用户模型
module.exports = {
    user:userModel
}
