module.exports = function (app, passport) {
    app.get('/', function (req, res) {
        res.render('index.jade'); // load the index.ejs file
    });

    app.get('/login', function(req, res) {
        res.render('index.jade');
    });
    app.get('/signup', function (req, res) {
        res.render('signup.jade');
    });
    app.get('/success', function (req, res) {
        res.render('success.jade');
    });

    app.get('/home', function(req, res) {
        res.render('home.jade');
    });

    app.post('/signup', function (req, res, next) {
        passport.authenticate('local-signup', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.redirect('/login');
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                //return res.redirect('/users/' + user.userName);
                return res.redirect('/success');
            });
        })(req, res, next);
    });

    app.post('/login', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
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
                console.log("users login success" + user);
                //return res.redirect('/users/' + user.userName);
                return res.redirect('/success');
            });
        })(req, res, next);
    });

};
