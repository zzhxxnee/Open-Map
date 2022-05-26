const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");

router.get("/", companyController.checkExistComp);
router.post("/", companyController.checkExistComp);
router.get("/search", companyController.searchExistComp);
router.post("/search", companyController.searchExistComp);

router.get("/chooseCompType", companyController.chooseCompType);
router.get("/registComp", companyController.registComp);
// router.get("/registRest", companyController.registRest);
// router.get("/registCafe", companyController.registCafe);
// router.get("/registHospital", companyController.registHospital);

router.get("/registComp/popup/jusoPopup", (req, res) => {
  res.render("jusoPopup");
});

router.post("/registComp/popup/jusoPopup", (req, res) => {
  res.locals = req.body;
  res.locals.islogin = req.user;
  res.render("jusoPopup");
});

module.exports = router;
