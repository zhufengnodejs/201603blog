var express = require('express');
//创建一个路由实例
var router = express.Router();

/* 当用户访问/路径的时候，执行此回调函数 */
router.get('/', function(req, res, next) {
  var user = req.session.user;
  res.render('index', { title: '首页'});
});

module.exports = router;
