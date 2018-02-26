var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const User = require('../models/User');

/* GET */
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

router.get('/logout',(req,res,next)=>{
  if(req.session){
    req.session.destroy((err)=>{
      
    });
  }
});

/* POST.*/
router.post('/register',(req,res,next) => {
  var userData = {
    email:req.body.email,
    password:req.body.password
  }

  if(userData.email && userData.password){
    // Cara pertama untuk insert
    /*  
    var user = new User({
      email:userData.email,
      password:userData.password
    });
    user.save((err)=>{
      if(err){}
      else{
        res.redirect('/');
      }
    });
    */

    // Cara kedua untuk insert
    User.create(userData,(err,user)=>{
      if(err) next(err);
      else{
        req.session.userId = user._id;
        res.redirect('/');
      }
    });
  }else{
    res.redirect('/register');  
  }
});

router.post('/login',(req,res,next) => {
  let email = req.body.email;
  let password = req.body.password;
  
  User.authenticate(email,password,(err,user)=>{
    if(err) {
      var err = new Error('Wrong email or password.');
      err.status = 401;
      return next(err);
    }else {
      console.log('Login success');
      req.session.userId = user._id;
      res.redirect('/');
    }
  });
});

module.exports = router;
