//引入express模块
var express = require('express');
//引用用来处理路径 join resolve
var path = require('path');
//处理收藏夹图标的中间件
var favicon = require('serve-favicon');
//日志记录器
var logger = require('morgan');
//处理cookie的 req.cookies属性
var cookieParser = require('cookie-parser');
//用来处理请求体 req.body
var bodyParser = require('body-parser');
//首页路由文件
var routes = require('./routes/index');
//用户路由
var users = require('./routes/users');
//文章路由
var articles = require('./routes/articles');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
//生成app
var app = express();

//设置模板的存放路径
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎
app.set('view engine', 'html');
//设置html的模板由ejs引擎来进行渲染
app.engine('html',require('ejs').__express);

//收藏夹图标的物理文件路径
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
var fs = require('fs');
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})

// setup the logger
app.use(logger('combined', {stream: accessLogStream}))
//处理请求体
app.use(bodyParser.json());//处理 application/json
app.use(bodyParser.urlencoded({ extended: false }));//处理 application/x-www-form-urlencoded
//解析 cookie 请求头中的cookie转成对象 req.cookies
app.use(cookieParser());
// req.session
app.use(session({
  secret:'zfpx',//加密cookie的密钥
  resave:true,//重新保存
  saveUninitialized:true,//保存未初始化的session
  store:new MongoStore({// 指定会话的数据库存储位置
    url:'mongodb://123.57.143.189:27017/zhufengnodejsblog'
  })
}));
//静态文件中间件
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
//此中间件处理每个模块里都要用的公用的变量
app.use(function(req,res,next){
  //res.locals它是模板渲染时真正用的数据源对象
  res.locals.user = req.session.user;
  //一旦取值之后会把flash中存放的值删除掉
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  //关键字在首页顶部模板中需要用到
  res.locals.keyword = '';
  res.locals.pageNum = 1;
  res.locals.pageSize = 2;
  next();
});

//配置首页路由
app.use('/', routes);
//配置用户路由
app.use('/users', users);
app.use('/articles', articles);
//捕获404错误并且转向错误处理中间件
app.use(function(req, res, next) {
  /*var err = new Error('Not Found');
  err.status = 404;
  next(err);*/
  res.render('404');
});

//开发错误处理器将打印出来堆栈异常
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

//生产环境中的错误处理
//不需要把信息泄露给用户
var errorLog = fs.createWriteStream('error.log', {flags: 'a'});
app.use(function(err, req, res, next) {
  var meta = '[' + new Date() + '] ' + req.url + '\n';
  errorLog.write(meta + err.stack + '\n');
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
