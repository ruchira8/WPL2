var Product = require('../models/products');
module.exports = function (app, passport) {
    app.get('/', function (req, res) {
        res.render('index.jade'); // load the index.ejs file
    });
    app.get('/menu', function (req, res) {
        res.render('menu.jade');
    });
    app.get('/getMenu', function (req, res) {
        Product.find(function (err, products) {
            res.send(products);
        })
    });
    app.get('/login', function (req, res) {
        res.render('index.jade', {message: req.flash('loginMessage')});
    });
    app.get('/signup', function (req, res) {
        res.render('signup.jade', {message: req.flash('signupMessage')});
    });
    app.get('/success', function (req, res) {
        res.render('success.jade');
    });

    app.get('/home', function (req, res) {
        res.render('home.jade');
    });

    /*app.get('/success', isLoggedInAjax, function(req, res) {
     return res.json(req.user);
     //console.log("res.json(req.user)"+res.json(req.user));
     });*/

    app.post('/signup', function (req, res, next) {
        passport.authenticate('local-signup', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.redirect('/signup');
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                //req.flash('success','Success!');
                //return res.redirect('/users/' + user.userName);
                return res.redirect('/success');
            });
        })(req, res, next);
    });

    app.post('/login', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                console.log("err" + err);
                return next(err);
            }
            if (!user) {
                console.log("info" + info);
                res.render('index.jade', {message: req.flash('loginMessage')});
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.redirect('/success');
            });
        }, {failureFlash: true})(req, res, next);
    });
    function isLoggedInAjax(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.json({redirect: '/login'});
        } else {
            next();
        }
    }

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/');
    }
};
