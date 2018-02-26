var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WELCOME',header: 'Home',state: req.session.state});
});

router.get('/register',(req,res,next) => {
  res.render('register',{state:req.session.state});
});

router.get('/login',(req,res,next) => {
  res.render('login');
});

router.get('/home',(req,res,next) => {
  res.render('home');
});

/* POST.*/
router.post('/register',(req,res,next) => {
  var userData = {
    email:req.body.email,
    password:req.body.password
  }

  // let _email = req.body.email;
  // let _password = req.body.password;
  // let _rePassword = req.body.repassword;
  
  // if(email.length != 0 && password.length != 0){
  //   res.redirect('/');
  //   req.session.destroy((err)=>{});    
  // }else{
  //   req.session.state = 'Error';
  //   res.redirect('register');
  // }

  // Cara pertama untuk insert
  // var user = new User({
  //   email:_email,
  //   password:_password
  // });
  // user.save((err)=>{
  //   if(err){}
  //   else{
  //     res.redirect('/');
  //   }
  // });
  
  // Cara kedua untuk insert
  User.create(userData,(err,user)=>{
    if(err){
      next(err);
    }
    else{
      req.session.userId = user._id;
      res.redirect('/');
    }
  });
});

router.post('/login',(req,res,next) => {
  let _email = req.body.email;
  let _password = req.body.password;
  User.find({email:_email,password:_password}).
      where('email').equals(_email).
      where('password').equals(_password).
      select('email password').
      exec((err,user) => {
        if(err) res.redirect('/');
        else {
          if(user.length == 0)res.send('User not found !');
          else{
            res.redirect('/home');
          }
        }
      });
});

module.exports = router;
