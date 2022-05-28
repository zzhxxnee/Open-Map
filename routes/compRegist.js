const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
// const geocoder = require("google-geocoder"),
//   geo = geocoder({
//     key: process.env.GOOGLE_API_KEY
//   });


// 업체등록페이지 1 - 이미 존재하는지 확인
router.get("/", companyController.checkExistComp);
router.post("/", companyController.checkExistComp);
// 검색하기 해서 db 불러온 페이지
router.get("/search", companyController.searchExistComp);
router.post("/search", companyController.searchExistComp);

// 없을 경우 업체 타입 저장 -- 일단 없이 하기
// router.get("/chooseCompType", companyController.chooseCompType);

// 내 업체가 없어요 -> registComp
router.get("/registComp", companyController.registComp);
router.post("/registComp", companyController.registCompNext);

router.get("/registComp/popup/jusoPopup", (req, res) => {
  res.render("jusoPopup");
});

router.post("/registComp/popup/jusoPopup", (req, res) => {
  res.locals = req.body;
  res.locals.islogin = req.user;
  res.render("jusoPopup");
});

// router.get("/registRest", companyController.registRest);
// router.get("/registCafe", companyController.registCafe);
// router.get("/registHospital", companyController.registHospital);

module.exports = router;
