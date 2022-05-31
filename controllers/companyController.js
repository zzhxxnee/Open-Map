require("dotenv").config();
const db = require("../models/index"),
    Company = db.company,
    Op = db.Sequelize.Op,
    geocoder = require("google-geocoder"),
    geo = geocoder({
        key: process.env.GOOGLE_API_KEY,
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
    price: "",
    menuName: "",
    compId: "",
};

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

// // 없으면 업체 유형 선택 페이지 -> 안하는 게 나을 것 같음..
// exports.chooseCompType = (req, res) => {
//     res.render("chooseCompType");
// };

// 일단 업체 공통 정보 입력 페이지, 여기서 업체 유형 선택하도록 하기
exports.registComp = (req, res) => {
    res.render("registComp");
};

exports.registCompNext = (req, res) => {
    // 도로명주소로 위경도 변환해서 저장
    geo.find(req.body.addr, function (err, res) {
        // console.log(res[0].location["lat"]);
        // console.log(res[0].location["lng"]);
        compInfo.latitude = res[0].location["lat"];
        compInfo.longitude = res[0].location["lng"];
    });
    
    compInfo.address = req.body.addr;
    compInfo.userId = "defaultID";
    compInfo.image= "";
    compInfo.compName= req.body.compName; //not null
    compInfo.bNo= req.body.compNum;
    compInfo.openDate= req.body.openDate;
    compInfo.address= req.body.addr; //not null
    compInfo.tel= req.body.telNum;
    compInfo.todayClosed= false;
    compInfo.earlyClosed= false;
    compInfo.vacation= false;
    // compInfo.latitude= "", //not null
    // compInfo.longitude= "", //not null
    compInfo.type= req.body.compType; //not null
    compInfo.mon= req.body.mon;
    compInfo.tue= false;
    compInfo.wed= false;
    compInfo.thu= false;
    compInfo.fri= false;
    compInfo.sat= false;
    compInfo.sun= false;

    if(compInfo.type == "R"){
        res.render("registRest");
    }else if(compInfo.type =="C"){
        res.render("registCafe");
    }
    else if(compInfo.type=="H"){
        res.render("registHospital")
    }
    else{
        res.send(req.body);
    }
};