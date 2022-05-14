var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/myPage/compRegist', (req,res,next) => {
  res.render("compRegist");
})

router.get('/myPage/compRegist/popup/jusoPopup', (req, res)=>{
  res.render('jusoPopup');
});

router.post('/myPage/compRegist/popup/jusoPopup', (req, res) => {
  res.locals = req.body;
  res.locals.islogin = req.user;
  res.render('jusoPopup');
});

module.exports = router;
