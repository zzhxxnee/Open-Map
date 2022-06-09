require("dotenv").config();
const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company/companyController");
const { request } = require("express");
var multer = require('multer');
var _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
var upload = multer({ storage: _storage });

// 업체등록페이지 1 - 이미 존재하는지 확인
router.get("/", companyController.checkExistComp);
router.post("/", companyController.checkExistComp);
// 검색하기 해서 db 불러온 페이지
router.get("/search", companyController.searchExistComp);
router.post("/search", companyController.searchExistComp);

// 존재하는 업체 클릭 시 해당 업체명과 주소를 서버로 보낸 뒤 그걸로 업체정보 받아옴
router.get("/existCompRegist", (req, res) => {
  res.send("잘못된 접근입니다.");
});
router.post("/existCompRegist",upload.single('picture'), companyController.existCompRegist);

// 존재하는 업체 내 업체로 등록하는 페이지에서 submit 하면 post로 전달됨.
router.post("/existCompNext", upload.single('picture'), companyController.existCompNext);

  // 내 업체가 없어요 -> registComp
  router.get("/registComp", companyController.registComp);
  router.post("/registComp", upload.single('picture'), companyController.registCompNext);

  // 주소검색하기 누르면 팝업창 뜨도록 설정
  router.get("/registComp/popup/jusoPopup", (req, res) => {
    res.render("compRegist/jusoPopup", { addrkey: process.env.ADDRESS_API_KEY });
  });

  // 팝업창에서 친 정보 가져오기
  router.post("/registComp/popup/jusoPopup", (req, res) => {
    res.locals = req.body;
    res.locals.islogin = req.user;
    res.render("compRegist/jusoPopup", { addrkey: process.env.ADDRESS_API_KEY });
  });

  // 업체등록 완료 페이지 주소복붙해서 오는 거 막기
  router.get("/registComp/finished", (req, res) => {
    res.send("잘못된 접근입니다.");
  })
  router.post("/registComp/finished", upload.single('picture'), companyController.registFinished);

  module.exports = router;
