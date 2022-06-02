const express = require("express");
const router = express.Router();
const MypageController = require('../controllers/mypageController');
var bodyParser = require("body-parser");
var parser = bodyParser.urlencoded({extended:false});
var multer = require('multer');
var _storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb){
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
var upload = multer({ storage: _storage });

router.get('/favorite', MypageController.showMyplaceList);

router.post('/config/myplace', MypageController.deleteMyPlace);

router.get('/', MypageController.showMypage);

/////////////////////////////////////////////////////////업체수정
router.post('/config/comp', MypageController.configcomp);

router.post('/config/cafe', upload.single('picture'), MypageController.configCafe);

router.post('/config/rest', upload.single('picture'), MypageController.configRest);

router.post('/config/hosp', upload.single('picture'), MypageController.configHosp);

////////////////////////////////////////////////////////이메일변경
router.get('/settings/email', (req,res) => {
    res.render('settingEmail');
});

router.post('/settings/email', MypageController.settingEmail);

router.post('/settings/email2', MypageController.settingEmail2);

module.exports = router;