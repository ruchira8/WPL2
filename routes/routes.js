module.exports = function (app, passport) {
    app.get('/', function (req, res) {
        res.render('index.jade'); // load the index.ejs file
    });

    app.post('/login', function (req, res) {
        console.log(req.body.userName);
        console.log(req.body.password);

    });

};

