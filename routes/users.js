var express = require('express');
var router = express.Router();


//获取注册表单
router.get('/reg', function(req, res, next) {
  res.send('获取注册表单');
});
//提交注册表单
router.post('/reg', function(req, res, next) {
  res.send('提交注册表单');
});

//获取登陆表单
router.get('/login', function(req, res, next) {
  res.send('获取登陆表单');
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
