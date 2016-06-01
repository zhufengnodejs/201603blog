var express = require('express');
//创建一个路由实例
var router = express.Router();

/* 当用户访问/路径的时候，执行此回调函数 */
router.get('/', function(req, res, next) {
  /**
   * 1. 获取模块文件路径
   * 2. 读取模板的内容
   * 3. 把里面的变量用对象的属性进行替换
   * 4. 把替换后的变量发回给客户端
   */
  res.render('index', { title: '首页' });
});

module.exports = router;
