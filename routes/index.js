var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Pizza Express'});
});

router.get('/login', function(req, res, next) {
  res.render('index', {title: 'Pizza Express'});
});

router.get('/signup', function(req, res, next) {
  res.render('signup', {title: 'Pizza Express'});
});

module.exports = router;
