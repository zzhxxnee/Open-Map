var express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { response } = require('../app');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router; 



