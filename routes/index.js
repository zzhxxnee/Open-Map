require('dotenv').config()
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'OpenMap', apikey : process.env.KAKAO_JS_KEY });
});

module.exports = router;
