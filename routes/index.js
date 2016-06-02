var express = require('express');
var model = require('../model');
var markdown = require('markdown').markdown;
//创建一个路由实例
var router = express.Router();

/* 当用户访问/路径的时候，执行此回调函数 */
router.get('/', function(req, res, next) {
  //populate表示填充 把user从id转成对象
  // {user:{}}
  model.article.find().populate('user').exec(function(err,docs){
    if(err){
      res.render('index', { title: '首页',articles:[]});
    }else{
      docs.forEach(function(doc){
        doc.content = markdown.toHTML(doc.content);
      });
      res.render('index', { title: '首页',articles:docs});
    }
  });

});

module.exports = router;
