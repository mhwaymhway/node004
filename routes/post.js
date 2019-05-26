var express = require('express');
var router = express.Router();

var Post = require('../model/post');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/postadd',function(req,res,next){
  res.render('post/post-add',{title:"Post Add"});
});
router.post('/postadd',function(req,res,next){
  var post=new Post();
  post.title=req.body.utitle;
  post.content=req.body.ucontent;
  post.author=req.body.uauthor;
  post.save(function(err,rtn){
    if(err) throw err;
    res.redirect('/post/postlist')
  });
});
router.get('/postlist',function (req,res,next) {
  Post.find({},function(err,rtn){
    if(err) throw err;
    res.render('post/post-list',{title:'Post List',posts:rtn})
  })
})
router.get('/postupdate/:id',function(req,res,next){
  Post.findById(req.params.id,function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.render('post/post-update',{title:'Post Update',posts:rtn})
  })
})
router.post('/postupdate',function(req,res,next){
  var updatep={
    title:req.body.utitle,
    content:req.body.ucontent,
    author:req.body.uauthor
  }
  Post.findByIdAndUpdate(req.body.id,{$set:updatep},function(err,rtn){
    if(err) throw err;
    res.redirect('/post/postlist')
  })
})
router.get('/postdetail/:id',function(req,res,next){
  Post.findById(req.params.id,function (err,rtn) {
    if(err) throw err;
    res.render('post/post-details',{title:'Post Detail',post:rtn})
})
})
router.get('/postdel/:id',function(req,res,next){
  Post.findByIdAndRemove(req.params.id,function (err,rtn) {
    if(err) throw err;
    res.redirect('/post/postlist')
  })
})

module.exports = router;
