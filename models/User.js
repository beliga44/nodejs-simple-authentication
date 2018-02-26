const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

var UserSchema = new Schema({
    email : String,
    password : String
});

// hashing password when create new User
UserSchema.pre('save',(next) => {
    var user = this;
    console.log(user);
    bcrypt.hash(user.password,10,(err,hash) => {
        if(err)return next(err);

        user.password = hash;
        next();
    });
});

var User = mongoose.model('User',UserSchema);
module.exports = User;