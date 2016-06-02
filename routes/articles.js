var express = require('express');
var markdown = require('markdown').markdown;
var router = express.Router();
var model = require('../model');

router.get('/list/:pageNum/:pageSize',function(req,res){
    //当前页码
    var pageNum = parseInt(req.params.pageNum);
    //每页的条数
    var pageSize = parseInt(req.params.pageSize);
    var keyword = req.query.keyword;//提交的关键字
    var query = {};//搜索对象
    if(keyword){//如果关键字有值的话
        var reg = new RegExp(keyword,'i');//创建一个正则表达式
        query = { //查询对象
            $or:[//只要有一个匹配就可以
                {title:reg},
                {content:reg}
            ]
        }
    }
    //populate表示填充 把user从id转成对象
    model.article.count(query,function(err,count){
        model.article.find(query).sort({createAt:-1}).skip((pageNum-1)*pageSize).limit(pageSize).populate('user').exec(function(err,docs){
            if(err){
                res.render('index', { title: '首页',articles:[]});
            }else{
                docs.forEach(function(doc){
                    doc.content = markdown.toHTML(doc.content);
                });
                res.render('index', { title: '首页',
                    keyword:keyword,//关键字
                    pageNum:pageNum,//当前页码
                    pageSize:pageSize, //每页的条数
                    totalPage:Math.ceil(count/pageSize),//一共多少页
                    articles:docs});
            }
        });
    });

});
//获取增加表单
router.get('/add', function(req, res, next) {
  res.render('article/add',{article:{}});
});
//提交增加表单
router.post('/add', function(req, res, next) {
  var article = req.body;//标题 正文
  if(article._id){//如果提交过来的表单有ID的话就表示更新
      model.article.update({_id:article._id},{
          $set:{
              title:article.title,
              content:article.content
          }
      },function(err,doc){
          if(err){
              req.flash('error',err.toString());
              res.redirect('back');
          }else{
              res.redirect('/articles/detail/'+article._id);
          }
      })
  }else{//如果提交过来的表单没有ID的话就是新增
      article.user = req.session.user._id;
      //因为article中有下划线ID，它是一个空字符串，如果是空字符串的话，mongoose并不会帮我们再自动生成一个新的ID，所以我们必须把这个字段删除掉
      delete article._id;
      model.article.create(article,function(err,doc){
          if(err){
              res.redirect('back');
          }else{
              res.redirect('/');
          }
      });
  }

});

//显示文章详情
router.get('/detail/:_id', function(req, res, next) {
    model.article.findOne({_id:req.params._id}).populate('user').populate('comments.user').exec(function(err,doc){
        if(err){
            res.redirect('back');
        }else{
            doc.content = markdown.toHTML(doc.content);
            res.render('article/detail',{article:doc});
        }
    })
});

//删除文章
router.get('/delete/:_id', function(req, res, next) {
    model.article.remove({_id:req.params._id},function(err,doc){
        if(err){
            res.redirect('back');
        }else{
          res.redirect('/');
        }
    })
});

router.get('/edit/:_id',function(req,res){
    model.article.findById(req.params._id,function(err,doc){
        res.render('article/add',{article:doc});
    });
});

//增加注释
router.post('/comment', function(req, res, next) {
    console.log(req.body);
    model.article.update({_id:req.body.articleId},{
        $push:{comments:{user:req.session.user._id,content:req.body.content}}
    },function(err,doc){
        if(err){
            req.flash('error',err.toString());
            res.redirect('back');
        }else{
            req.flash('success','评论成功');
            res.redirect('/articles/detail/'+req.body.articleId);
        }
    });
});


module.exports = router;
