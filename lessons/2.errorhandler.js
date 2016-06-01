var express = require('express');
var app = express();
//中间件1
app.use((req,res,next)=>{
    console.log('中间件1',req.url);
   next(new Error('我错了'));
});

//中间件2
app.use((req,res,next)=>{
    console.log('中间件2');
next();
});
app.get('/',function(req,res){
    res.end('root');
})
//错误处理中间件
app.use((err,req,res,next)=>{
    console.log('错误处理中间件');
    next();
});

app.listen(9090);