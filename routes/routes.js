var Product = require('../models/products');
var Order = require('../models/orders');
//var orderhist=db.collection('Order');

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
    app.get('/admin', function (req, res) {
        res.render('admin.jade'); // load the index.ejs file
    });
    app.get('/admin/products', function (req, res) {
        res.render('products.jade'); // load the index.ejs file
    });
    app.get('/admin/add', function (req, res) {
        res.render('addProducts.jade'); // load the index.ejs file
    });
    app.get('/admin/delete', function (req, res) {
        res.render('deleteProducts.jade'); // load the index.ejs file
    });
    app.get('/admin/update', function (req, res) {
        res.render('updateProducts.jade'); // load the index.ejs file
    });
    app.get('/login', function(req, res) {
        res.render('index.jade',{ message: req.flash('loginMessage')});
    });
    app.get('/signup', function (req, res) {
        res.render('signup.jade',{ message: req.flash('signupMessage')});
    });
   app.get('/success', function (req, res) {
        res.render('success.jade');
    });
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.jade',{ user: req.user });
    });
    app.get('/orders', isLoggedIn, function (req, res) {
        Order.find({user: req.user.id},function (err,docs){
            res.render('orders.jade', {data: docs});
        });
    });

    app.get('/placeOrder', function (req, res) {
        res.render('placeOrder.jade');
    });

    app.get('/home', function(req, res) {
        res.render('home.jade');
    });

    app.get('/addressform', function(req, res) {
        res.render('addressform.jade');
    });

    app.get('/menu', function (req, res) {
        res.render('menu.jade');
    });
    app.get('/getMenu', function (req, res) {
        Product.find(function (err, products) {
            res.send(products);
        })
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
                res.render('index.jade',{ message: req.flash('loginMessage')});
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                if(user.userName=='admin1'){
                    return res.redirect('/admin');
                }
                return res.redirect('/profile');
            });
        },{failureFlash:true})(req, res, next);
    });
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/');
    }
};
