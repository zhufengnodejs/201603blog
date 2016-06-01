var express = require('express');
var router = express.Router();
var model = require('../model');

//获取注册表单
router.get('/reg', function(req, res, next) {
  //这是一个相对路径，相对于views目录
  res.render('user/reg',{});
});
//提交注册表单
router.post('/reg', function(req, res, next) {
  var user = req.body;
  //如果说密码和重复密码不一致，则退回上一个页面
  if(user.password != user.repassword){
    req.flash('error','密码和重复密码不一致，请重新填写');
    return res.redirect('back');
  }
  //删除不需要持久化的重复密码字段
  delete user.repassword;
  user.avatar = 'https://s.gravatar.com/avatar/'+md5(user.email)+'?s=80';
  //把它保存到数据库中
  model.user.create(user,function(err,doc){
    if(err){
      req.flash('error','注册失败，请重新填写');
      return res.redirect('back');
    }else{
      req.session.user = doc;
      req.flash('success','恭喜你注册成功');
      res.redirect('/');
    }
  });
});
function md5(str){
  return require('crypto').createHash('md5').update(str).digest('hex');
}
//获取登陆表单
router.get('/login', function(req, res, next) {
  res.render('user/login',{});
});

//提交登陆表单
router.post('/login', function(req, res, next) {
  res.send('提交登陆表单');
});

//退出登陆
router.get('/logout', function(req, res, next) {
  res.send('退出登陆');
});

module.exports = router;
