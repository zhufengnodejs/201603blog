var express = require('express');
var router = express.Router();
//在路由实例中也可以使用中间件
router.use(function(req,res,next){
  console.log('user use');
  next();
});

/* 获取用户列表 */
router.get('/list', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
