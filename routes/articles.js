var express = require('express');
var markdown = require('markdown').markdown;
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

//显示文章详情
router.get('/detail/:_id', function(req, res, next) {
    model.article.findById(req.params._id,function(err,doc){
        if(err){
            res.redirect('back');
        }else{
            doc.content = markdown.toHTML(doc.content);
            res.render('article/detail',{article:doc});
        }
    })
});

//删除文章
router.get('/delete/:_id', function(req, res, next) {
    model.article.remove({_id:req.params._id},function(err,doc){
        if(err){
            res.redirect('back');
        }else{
          res.redirect('/');
        }
    })
});

module.exports = router;
