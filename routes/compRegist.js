var express = require('express');
var router = express.Router();
const companyController = require("../controllers/companyController");

router.get("/", companyController.checkExistComp);
router.get("/chooseCompType", companyController.chooseCompType);
router.get("/registComp", companyController.registComp);
// router.get("/registRest", companyController.registRest);
// router.get("/registCafe", companyController.registCafe);
// router.get("/registHospital", companyController.registHospital);

  
  router.get('/registComp/popup/jusoPopup', (req, res) => {
    res.render('jusoPopup');
  });
  
  router.post('/registComp/popup/jusoPopup', (req, res) => {
    res.locals = req.body;
    res.locals.islogin = req.user;
    res.render('jusoPopup');
  });
  


module.exports = router; 

