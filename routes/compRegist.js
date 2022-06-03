const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const db = require("../models/index");
const Company = db.company;
const User = db.users;
const Op = db.Sequelize.Op;
const companyController = require("../controllers/companyController");
const { request } = require("express");
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

router.post("/existCompRegist", async (req, res) => {
  var cname = req.body.searchCompName;
  var caddr = req.body.searchCompAddr;
  if (typeof (cname) == "object") {
    cname = cname[0];
    caddr = caddr[0];
  }
  Company.findOne({
    where: {
      compName: {
        [Op.like]: "%" + cname + "%",
      },
      address: {
        [Op.like]: "%" + caddr + "%",
      }
    },
  })
    .then((result) => {
      //res.send(result.address);
      res.render("registExistComp", { compInfo: result });
    })
    .catch((err) => {
      console.log(err);
    });
})

router.get("/existCompNext", (req, res)=>{
  res.render("registExistCompEnd");
})

router.post("/existCompNext", async (req, res) => {
  User.update({ isOwner: 1 }, { where: { id: "defaultID" } })
    .then(() => {
      Company.update({
        bNo: req.body.compNum,
        openDate: req.body.openDate,
        UserId: "defaultID",
        tel: req.body.tel,
        mon: req.body.mon,
        tue: req.body.tue,
        wed: req.body.wed,
        thu: req.body.thu,
        fri: req.body.fri,
        sat: req.body.sat,
        sun: req.body.sun,
      },
        {
          where: {
            compName: req.body.compName,
            address: req.body.addr
          }
        })
    }).then(() => { res.render("registExistCompEnd", { compInfo: req.body });})
    .catch((err) => {
      console.log(err);
    })

})


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

router.get("/registComp/finished", (req, res) => {
  res.send("잘못된 접근입니다.");
})
router.post("/registComp/finished", companyController.registFinished);

module.exports = router;
