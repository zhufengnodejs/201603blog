//此中间件要求必须先登陆之后才能访问 /articles/add
exports.checkLogin = function(req,res,next){
   if(req.session.user){//如果有值表示已经登陆
       next();
   }else{
       req.flash('error','你还没登录呢?去登录吧');
       return res.redirect('/users/login');
   }
}

//此中间件要求必须未登陆之后才能访问 /user/reg
exports.checkNotLogin = function(req,res,next){
    if(req.session.user){//如果有值表示已经登陆
        req.flash('error','你已经登录了?不用再登录了');
        return res.redirect('/');
    }else{
        next();
    }
}