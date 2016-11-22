var express = require('express');
var mongoose = require("mongoose");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var morgan = require("morgan");
var flash = require('connect-flash');
var bcrypt = require('bcrypt-nodejs');



require('./config/passport')(passport);

var index = require('./routes/index');
var users = require('./routes/users');
var db = require('./db');
mongoose.connect(db.url);
//var passportConfig = require('./config/passport');

var app = express();
app.use(passport.initialize());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'ilovescotchscotchyscotchscotch'})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
app.use('/', index);
app.use('/users', users);
app.use(express.static('public'))
require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
var User = require('./models/user');

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

//module.exports = app;
app.listen(3000);
console.log('The magic happens on port 3000');

/*var user = new User({
 userName: "priyanka",
 name: "Priyanka",
 password: "12345",
 address: "Dallas,TX",
 email: "priyanka@email.com",
 phome: "1234567891",
 zipcode: "75252"
 });*/
/*var password = "priyanka";
 var newUser = new User();
 newUser.name = "Priyanka";
 newUser.userName = "priyanka";
 newUser.address = "Dallas,TX";
 newUser.email = "priyanka@email.com";
 newUser.phNo = "1234567891";
 newUser.zipCode = "75252";
 /!*newUser.hash = crypto.randomBytes(16).toString('hex');
 newUser.salt = crypto.pbkdf2Sync(new Buffer(password, 'binary'), this.salt, 1000, 64).toString('hex');*!/
 newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
 newUser.save(function (err) {
 if (err) {
 console.log("Error saving");
 } else {
 console.log("Saved");
 }

 });*/
