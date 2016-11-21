var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
//var User = mongoose.model('User');
var User = require('../models/user');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.userName);
    });
    passport.deserializeUser(function(id, done) {
       // User.findById(id, function(err, user) {
            done({id:user.userName});
        //});
    });
    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'userName',
            passwordField : 'password',
            passReqToCallback: true
        },
        function(req, username, password, done) {

            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({ userName: username}, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, {message: 'That email is already taken.'});
                    } else {
                        console.log("In Database");
                        // if there is no user with that email
                        // create the user
                        var newUser= new User();
                        console.log("username"+username);
                        console.log("password"+password);
                        console.log("email"+req.body.name);
                        console.log("email"+req.body.email);
                        console.log("address"+req.body.address);
                        console.log("phNo"+req.body.phNo);
                        console.log("zipCode"+req.body.zipCode);
                        // set the user's local credentials
                        newUser.userName    = username;
                        newUser.password = newUser.generateHash(password);
                        newUser.name = req.body.name;
                        newUser.email    = req.body.email;
                        newUser.address    = req.body.address;
                        newUser.phNo    = req.body.phNo;
                        newUser.zipCode    = req.body.zipCode;
                        console.log("username"+newUser.userName);
                        console.log("password"+newUser.password);
                        console.log("email"+newUser.email);
                        console.log("address"+newUser.address);
                        console.log("phNo"+newUser.phNo);
                        console.log("zipCode"+newUser.zipCode);
                        console.log("In Database after addition");
                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            console.log("Added"+done(null, user));
                            return done(null, user);
                        });
                    }

                });

            });

        }));

    passport.use(new LocalStrategy({
            usernameField: 'userName',
            passwordField : 'password'
        },
        function(req, username, password, done) {
            User.findOne({ userName: username }, function (err, user) {
                if (err) { return done(err); }
                // Return if user not found in database
                if (!user) {
                    return done(null, false, {
                        message: 'User not found'
                    });
                }
                // Return if password is wrong
                if (!user.validPassword(password)) {
                    return done(null, false, {
                        message: 'Password is wrong'
                    });
                }
                // If credentials are correct, return the user object
                return done(null, user);
            });
        }
    ));

}
