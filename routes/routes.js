module.exports = function (app, passport) {
    app.get('/', function (req, res) {
        res.render('index.jade'); // load the index.ejs file
    });

    app.get('/login', function(req, res) {
        console.log("Login entered");
        // render the page and pass in any flash data if it exists
        res.render('index.jade');
    });

   app.post('/signup', passport.authenticate('local-signup',{
        successRedirect: '/login'
        //failureFlash: 'Invalid username and password'
    }));


    app.post('/login', passport.authenticate('local',{
        successRedirect: '/signup',
        failureFlash: 'Invalid username and password'
    },function(err, user, info){
        console.log("Login successful");
    }));

};

