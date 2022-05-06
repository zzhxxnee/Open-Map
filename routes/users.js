var express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { response } = require('../app');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello' });
});

router.get('/login', function(req, res) { // 클라이언트의 http://도메인/login 에 대한 응답 요청
  res.render('login', {title:'login'});
});

router.post('/login', function(req, res, next){
  console.log(req.body);
 
  var id = req.body.user_id;
  var pwd = req.body.user_pwd;
 
  res.redirect('/');
});

module.exports = router; 
