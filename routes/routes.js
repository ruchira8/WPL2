module.exports = function (app, passport) {
    app.get('/', function (req, res) {
        res.render('index.jade'); // load the index.ejs file
    });

    app.get('/login', function(req, res) {
        console.log("Login entered");
        // render the page and pass in any flash data if it exists
        res.render('index.jade');
    });
    app.post('/login', function (req, res) {
        console.log(req.body.userName);
        console.log(req.body.password);

    });
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs');
    });
    app.post('/signup', function (req, res) {
        console.log(req.body.userName);
        console.log(req.body.password);
        console.log(req.body.email);
        console.log(req.body.name);
        console.log(req.body.address);
        console.log(req.body.phNo);
        console.log(req.body.zipCode);
    });
    /*app.post('/signup', passport.authenticate('local-signup',{
        successRedirect: '/',
        failureFlash: 'Invalid username and password'
       // failureRedirect: '/'
        //failureFlash: true
    }));*/

    /*app.post('/login', passport.authenticate('local-login',{
        successRedirect: '/',
        failureFlash: 'Invalid username and password'
    }));*/

    /*app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });*/
};
/*function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}*/
