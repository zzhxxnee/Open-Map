var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/compCheck', (req, res, next) => {
  res.render("compCheck");
})

router.get('/compRegist', (req, res, next) => {
  res.render("compRegist");

})

router.post('/compRegist', (req, res, next) => {
  res.render("compRegist");
})


router.get('/compRegist/popup/jusoPopup', (req, res) => {
  res.render('jusoPopup');
});

router.post('/compRegist/popup/jusoPopup', (req, res) => {
  res.locals = req.body;
  res.locals.islogin = req.user;
  res.render('jusoPopup');
});

module.exports = router;
