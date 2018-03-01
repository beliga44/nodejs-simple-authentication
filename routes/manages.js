var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.use('/user',(req,res,next)=>{
    if(req.session.userId){
        next();
    }else{
        res.redirect('/');
    }
});

/* GET manages listing. */
router.get('/user',(req,res,next)=>{
    User.find((err,usersData)=>{
        res.render('manage_user',{users:usersData});
    });
});

router.get('/user/:id',(req,res,next)=>{
    var uid = req.params.id;
    User.find({_id:uid},(err,userData)=>{
        res.render('edit_user',{user:userData[0]});
    });
});

router.get('/user/delete/:id',(req,res,next)=>{
    var uid = req.params.id;
    User.findOneAndRemove({_id:uid},(err,userData)=>{
        res.redirect('/manage/user');
    });
});

/* POST */

router.post('/user/:id',(req,res,next)=>{
    var uid = req.params.id
    User.findOneAndUpdate({_id:uid},{
        'email':req.body.email
    },(err,user)=>{
        res.redirect('/manage/user');
    });
});

module.exports = router;