const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltNum = 10;

var UserSchema = new Schema({
    email : String,
    password : String
});

UserSchema.statics.authenticate = function (email,password,cb){
    User.findOne({email:email}).exec((err,user)=>{
        if(err) return cb(err);
        else if(!user) {
            var err = new Error('User not found.');
            err.status = 401;
            return cb(err);
        }
        bcrypt.compare(password,user.password,(err,result)=>{
           if(result == true) {
               return cb(null,user);
           }else{
               
           }
        });
    });
}

// hashing password when create new User
UserSchema.pre('save',function(next){
    var user = this;
    bcrypt.hash(user.password,saltNum,(err,hash) => {
        if(err) return next(err);
        user.password = hash;
        console.log(user.password);
        next();
    });
});

var User = mongoose.model('User',UserSchema);
module.exports = User;