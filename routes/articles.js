var express = require('express');
var router = express.Router();


//获取增加表单
router.get('/add', function(req, res, next) {
  res.send('获取增加文章的空白表单');
});
//提交增加表单
router.post('/add', function(req, res, next) {
  res.send('提交增加文章的表单');
});

module.exports = router;
