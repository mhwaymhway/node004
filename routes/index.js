var express = require('express');
var router = express.Router();
var Admin = require('../model/Admin');
var validator = require("email-validator");
var passwordValidator = require('password-validator');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/home',function(req,res,next){
  res.render('home',{title:"Home Page"});
});
router.get('/singup',function(req,res,next){
  res.render('singup');
})
router.post('/singup',function(req,res,next){
  var admin =new Admin();
  admin.name = req.body.name;
  admin.email=req.body.email;
  admin.password=req.body.password;
  admin.save(function(err,rtn){
  if(err) throw err;
  console.log(rtn);
res.redirect('/') ;
});
});
router.get('/signin',function (req,res,next){
  res.render('signin')
});
router.post('/signin',function (req,res,next){
  Admin.findOne({email:req.body.email},function(err,admin){
    if(err) throw err;
    console.log(admin);
    if(admin != null && Admin.compare(req.body.password,admin.password)){
      req.session.user = {name:admin.name, email:admin.email ,id:admin.id};
      res.redirect('/users/useradd');
    }else {
      res.redirect('/signin')
    }
  })
})
router.post('/emaildu',function (req,res,next){
  Admin.findOne({email:req.body.email},function (err,rtn){
    if(err) throw err;
    var check = (req.body.email =='')? true : validator.validate(req.body.email);
    console.log('Email val is',validator.validate(req.body.email));
    if(rtn != null || !check){
      res.json({status:true})
    }else {
      res.json({status:false})
    }
  })
})
router.post('/pwdcheck',function (req,res,next){
  var schema = new passwordValidator();
schema
.is().min(8)
.is().max(100)
.has().uppercase()
.has().lowercase()
.has().digits()
.has().not().spaces()
.is().not().oneOf(['Passw0rd', 'Password123']);
res.json({status:schema.validate(req.body.password)})
})
module.exports = router;
