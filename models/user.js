var mongoose = require("mongoose");
var crypto = require('crypto');
//var jwt = require('jsonwebtoken');
var userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phNo: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});
userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};
/*userSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        userName: this.userName,
        name: this.name,
        email: this.email,
        address: this.address,
        phNo: this.phNo,
        zipCode: this.zipCode,
    });
};*/
userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};
module.exports = mongoose.model('User', userSchema);
