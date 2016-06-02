var express = require('express');
var router = express.Router();
var model = require('../model');
//获取增加表单
router.get('/add', function(req, res, next) {
  res.render('article/add',{});
});
//提交增加表单
router.post('/add', function(req, res, next) {
  var article = req.body;//标题 正文
  article.user = req.session.user._id;
  model.article.create(article,function(err,doc){
     if(err){
       res.redirect('back');
     }else{
       res.redirect('/');
     }
  });

});

module.exports = router;
