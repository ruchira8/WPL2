var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.userName);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            emailField: 'email',
            nameField: 'name',
            addressField: 'address',
            phnoField: 'phNo',
            zipcodeField: 'zipCode',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(username, password, email, name, address, phNo, zipCode, done) {

            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({ userName: username, password: password, email:email, address:address, phNo:phNo, zipCode:zipCode}, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, {message: 'That email is already taken.'});
                    } else {

                        // if there is no user with that email
                        // create the user
                        var newUser            = new User();

                        // set the user's local credentials
                        newUser.userName    = username;
                        newUser.password = newUser.generateHash(password);
                        newUser.email    = email;
                        newUser.address    = address;
                        newUser.phNo    = phNo;
                        newUser.zipCode    = zipCode;

                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });

            });

        }));

    passport.use('local-login', new LocalStrategy({
            usernameField: 'username',
            passwordField : 'password'
        },
        function(username, password, done) {
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
