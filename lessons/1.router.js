var express = require('express');
var app = express();
//中间件1
app.use((req,res,next)=>{
    console.log('中间件1',req.url);
   next();
});

//中间件2
app.use((req,res,next)=>{
    console.log('中间件2');
next();
});
var userRouter = express.Router();
userRouter.use(function(req,res,next){
    console.log('userRouter 中间件1');
    next();
});
userRouter.get('/user',function(req,res,next){
    res.end('user');
});
app.use('/user',userRouter);


app.listen(9090);