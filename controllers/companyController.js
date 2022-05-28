require("dotenv").config();
const db = require("../models/index"),
    Company = db.company,
    Op = db.Sequelize.Op,
    geocoder = require("google-geocoder"),
    geo = geocoder({
        key: process.env.GOOGLE_API_KEY
    });

// 업체등록 1 - 이미 존재하는지 확인
exports.checkExistComp = (req, res) => {
    res.render("checkExistComp");
};

exports.searchExistComp = (req, res, next) => {
    let searchWord = req.body.compName;
    Company.findAll({
        where: {
            compName: {
                [Op.like]: "%" + searchWord + "%",
            },
        },
    })
        .then((result) => {
            // console.log(result);
            res.render("searchExistComp", { searchComp: result });
        })
        .catch((err) => {
            console.log(err);
        });
};

// 여기서 있으면 그 업체 클릭 -> 이미등록된업체로..(?)

// 없으면 업체 유형 선택 페이지 -> 안하는 게 나을 것 같음..
exports.chooseCompType = (req, res) => {
    res.render("chooseCompType");
};

// 일단 업체 공통 정보 입력 페이지, 여기서 업체 유형 선택하도록 하기
exports.registComp = (req, res) => {
    res.render("registComp");
};

// // 식당 클릭했으면 registRest
// exports.registRest = (req, res) =>{
//     res.render("registRest");
// }

// // 휴게음식점 클릭했으면 registCafe
// exports.registCafe = (req, res) => {
//     res.render("registCafe");
// }

// // 병원 클릭했으면 registHospital
// exports.registHospital = (req, res) => {
//     res.render("registHospital");
// }