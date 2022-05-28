const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const geocoder = require("google-geocoder"),
  geo = geocoder({
    key: "AIzaSyAAi3TP-tpiV_A9za-bwhnJc57xPcCIDbU",
  });

let compInfo = {
  userId: "",
  image: "",
  compName: "", //not null
  bNo: "",
  openDate: "",
  address: "", //not null
  tel: "",
  todayClosed: false,
  earlyClosed: false,
  vacation: false,
  latitude: "", //not null
  longitude: "", //not null
  type: "", //not null
  mon: false,
  tue: false,
  wed: false,
  thu: false,
  fri: false,
  sat: false,
  sun: false,
};

let restInfo = {
  restOpen: "",
  restClosed: "",
  restType: "", //not null
  breakStart: "",
  breakEnd: "",
};

let cafeInfo = {
  cafeOpen: "",
  cafeClosed: "",
  cafeType: "", //not null
};

let hospitalInfo = {
  HospType: "",
  HospOpenMon: "",

  HospCloseMon: "",

  HospOpenTue: "",

  HospCloseTue: "",

  HospOpenWed: "",
  HospCloseWed: "",

  HospOpenThu: "",
  HospCloseThu: "",

  HospOpenFri: "",
  HospCloseFri: "",

  HospOpenSat: "",
  HospCloseSat: "",

  HospOpenSun: "",
  HospCloseSun: "",

  HospOpenVac: "",
  HospCloseVac: "",

  content: "",

  breakStart: "",
  breakEnd: "",
};

let menuInfo = {
  price:"",
  menuName:"",
  compId:""
}

router.get("/", companyController.checkExistComp);
router.post("/", companyController.checkExistComp);
router.get("/search", companyController.searchExistComp);
router.post("/search", companyController.searchExistComp);

router.get("/chooseCompType", companyController.chooseCompType);
router.get("/registComp", companyController.registComp);
router.post("/registComp", (req, res, next) => {
  //console.log(req.body.addr);
  geo.find(req.body.addr, function (err, res) {
    console.log(res[0].location["lat"]);
    console.log(res[0].location["lng"]);
  });
});
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
