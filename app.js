var express = require('express');
var app = express();
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

var db = require('./config/db');
mongoose.connect(db.url);

require('./config/passport')(passport);


app.use(logger('dev'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
var index = require('./routes/index');
var users = require('./routes/users');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(session({secret: 'donut'}));
//var passportConfig = require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function (req, res, next) {
    res.locals.loginMessage = req.flash('loginMessage');
    res.locals.signupMessage = req.flash('signupMessage');
    res.locals.adminMessage = req.flash('adminMessage');
    next();
});
// view engine setup
app.use('/', index);
app.use('/users', users);
require('./routes/routes.js')(app, passport);
app.use(express.static(path.join(__dirname, 'public')));
// session secret
// /app.use(session());
//app.use(passport.initialize());
// persistent login sessions

// load our routes and pass in our app and fully configured passport
app.use(express.static('public'));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//app.use(express.bodyParser());


//var User = require('./models/user');
//var Admin = require('./models/admin');
var Product = require('./models/products');
//var Topping = require('./models/toppings');
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

/*Product.findOneAndUpdate({ image: 'peperoni.jpg' }, { image: '/images/peperoni.jpg' }, function(err, user) {
 if (err) throw err;

 // we have the updated user returned to us
 console.log(user);
 });*/

/*var topping1 = new Topping();
 topping1.name = "Onions";
 topping1.price = 1;
 topping1.save(function (err) {
 if (err) {
 console.log("Error saving");
 } else {
 console.log("Saved");
 }
 });
 var topping2 = new Topping();
 topping2.name = "Tomatoes";
 topping2.price = 1;
 topping2.save(function (err) {
 if (err) {
 console.log("Error saving");
 } else {
 console.log("Saved");
 }
 });*/
/*var product = new Product();
 product.name = "Spicy Italian";
 product.description = "Pepperoni plus a double portion of spicy Italian sausage.";
 product.image = "/images/spicyItalian.jpg";
 product.price = [{size: "small", price: 9}, {size: "medium", price: 12}, {size: "large", price: 14}];
 product.available = true;
 product.save(function (err) {
 if (err) {
 console.log("Error saving");
 } else {
 console.log("Saved");
 }
 });*/


/*var admin = new Admin();
 admin.userName= "admin";
 admin.email= "admin@email.com";
 admin.name= "admin";
 admin.password= bcrypt.hashSync("password", bcrypt.genSaltSync(8), null);
 admin.save(function(err){
 if (err) {
 console.log("Error saving");
 } else {
 console.log("Saved");
 }
 });*/

//var password = "priyanka";
/*var newUser = new User();
 newUser.name = "admin1";
 newUser.userName = "admin1";
 newUser.password = newUser.generateHash("admin");
 newUser.address = "Dallas,TX";
 newUser.email = "admin1@email.com";
 newUser.phNo = "1234567891";
 newUser.zipCode = "75252";
newUser.save(function (err) {
    if (err) {
        console.log("Error saving");
    } else {
        console.log("Saved");
    }

});*/
 /*newUser.hash = crypto.randomBytes(16).toString('hex');
 newUser.salt = crypto.pbkdf2Sync(new Buffer(password, 'binary'), this.salt, 1000, 64).toString('hex');*!/
 newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
 newUser.save(function (err) {
 if (err) {
 console.log("Error saving");
 } else {
 console.log("Saved");
 }

 });*/
