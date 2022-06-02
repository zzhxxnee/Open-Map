require("dotenv").config();
const db = require("../models/index"),
    User = db.users,
    Company = db.company,
    Rest = db.restaurant,
    Cafe = db.cafe,
    Hosp = db.hospital,
    Menu = db.menu,
    Op = db.Sequelize.Op, 
    geocoder = require("google-geocoder"),
    geo = geocoder({
        key: process.env.GOOGLE_API_KEY,
    });

let compInfo = {
    compId: "",
    userId: "",
    image: null,
    compName: "", //not null
    bNo: null,
    openDate: null,
    address: "", //not null
    tel: null,
    todayClosed: 0,
    earlyClosed: 0,
    vacation: 0,
    latitude: "", //not null
    longitude: "", //not null
    type: "", //not null
    mon: 0,
    tue: 0,
    wed: 0,
    thu: 0,
    fri: 0,
    sat: 0,
    sun: 0,
};

let restInfo = {
    restOpen: "",
    restClosed: "",
};

let cafeInfo = {
    cafeOpen: "",
    cafeClosed: "",
    cafeType: "", //not null
};

let hospitalInfo = {
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

    HospType: "",

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

exports.registCompNext = async (req, res) => {
    // 도로명주소로 위경도 변환해서 저장
    geo.find(req.body.addr, function (err, res) {
        console.log(res[0].location["lat"]);
        console.log(res[0].location["lng"]);
        compInfo.latitude = res[0].location["lat"];
        compInfo.longitude = res[0].location["lng"];
    });

    compInfo.address = req.body.addr;
    compInfo.userId = "defaultID"; //로그인 구현되면 수정하기
    compInfo.image = req.body.image;
    compInfo.compName = req.body.compName; //not null
    compInfo.bNo = req.body.compNum;
    compInfo.openDate = req.body.openDate;
    compInfo.address = req.body.addr; //not null
    compInfo.tel = req.body.telNum;
    compInfo.type = req.body.compType; //not null
    compInfo.mon = req.body.mon;
    compInfo.tue = req.body.tue;
    compInfo.wed = req.body.wed;
    compInfo.thu = req.body.thu;
    compInfo.fri = req.body.fri;
    compInfo.sat = req.body.sat;
    compInfo.sun = req.body.sun;

    if (compInfo.type == "R") {
        res.render("registRest");
    } else if (compInfo.type == "C") {
        res.render("registCafe");
    }
    else if (compInfo.type == "H") {
        res.render("registHospital")
    }
    else {
        res.send("뭔가 잘못됨...!");
    }
};

exports.registFinished = async (req, res) => {
    res.send(req.body);
    Company.create({
        image: compInfo.image,
        compName: compInfo.compName,
        bNo: compInfo.bNo,
        openDate: compInfo.openDate,
        address: compInfo.address,
        tel: compInfo.tel,
        todayClosed: 0,
        earlyClosed: 0,
        vacation: 0,
        latitude: compInfo.latitude,
        longitude: compInfo.longitude,
        type: compInfo.type,
        mon: compInfo.mon,
        tue: compInfo.tue,
        wed: compInfo.wed,
        thu: compInfo.thu,
        fri: compInfo.fri,
        sat: compInfo.sat,
        sun: compInfo.sun,
        UserId: compInfo.userId,
    }).then(() => {
        Company.findAll({
            attributes: ['compId'],
            where: {
                compName: compInfo.compName,
                address : compInfo.address,
                UserId: compInfo.userId
            }
        })
            .then((result) => {
                //console.log(result[0].dataValues.compId);
                compInfo.compId = result[0].dataValues.compId*1;
                console.log("업체번호: "+compInfo.compId);
            }).then((result)=>{
                if (compInfo.type == "R") {
                    if (req.body.allDays == "true") {
                        restInfo.restOpen = 0;
                        restInfo.restClosed = 4000;
                    } else {
                        restInfo.restOpen = req.body.openTime[0] * 100 + req.body.openTime[1] * 1;
                        restInfo.restClosed = req.body.closedTime[0] * 100 + req.body.closedTime[1] * 1;
                        if (req.body.tomorrow == "true") {
                            restInfo.restClosed += 2400;
                        }
                    }
            
                    if (req.body.noBreak == "true") {
                        Rest.create({
                            restOpen: restInfo.restOpen,
                            restClosed: restInfo.restClosed,
                            restType: req.body.restType, //not null
                            breakStart: null,
                            breakEnd: null,
                            compId: compInfo.compId,
                        });
                    } else {
                        Rest.create({
                            restOpen: restInfo.restOpen,
                            restClosed: restInfo.restClosed,
                            restType: req.body.restType, //not null
                            breakStart: req.body.breakStart[0] * 100 + req.body.breakStart[1] * 1,
                            breakEnd: req.body.breakEnd[0] * 100 + req.body.breakEnd[1] * 1,
                            compId: compInfo.compId,
                        });
                    }
                    //메뉴 해결하기
                    // for (var i = 0; i < req.body.menu.length; i++) {
                    //     // Menu.create({
                    //     //     menuNmae : req.body.menu[i],
                    //     //     price : req.body.price[i]
                    //     // });
                    //     console.log(req.body.menu[i]);
                    //     console.log(req.body.price[i]);
                    // }
                    Menu.create({
                        menuName : req.body.menu,
                        price : req.body.price,
                        CompanyCompId : compInfo.compId
                    });
                } else if (compInfo.type == "C") {
                    if (req.body.allDays == "true") {
                        cafeInfo.cafeOpen = 0;
                        cafeInfo.cafeClosed = 4000;
                    } else {
                        cafeInfo.cafeOpen = req.body.openTime[0] * 100 + req.body.openTime[1] * 1;
                        cafeInfo.cafeClosed = req.body.closedTime[0] * 100 + req.body.closedTime[1] * 1;
                        if (req.body.tomorrow == "true") {
                            cafeInfo.cafeClosed += 2400;
                        }
                    }
                    Cafe.create({
                        cafeOpen: cafeInfo.cafeOpen,
                        cafeClosed: cafeInfo.cafeClosed,
                        cafeType: req.body.cafeType, //not null
                        CompanyCompId: compInfo.compId,
                    });
                    Menu.create({
                        menuName : req.body.menu,
                        price : req.body.price,
                        CompanyCompId : compInfo.compId
                    });
            
            
                    ///////병원///////////////////////////
                } else if (compInfo.type == "H") {
                    hospitalInfo.HospType = req.body.hospType;
                    hospitalInfo.content = req.body.content;
            
                    if (req.body.allDays == "true") {
                        hospitalInfo.HospOpenMon = 0;
                        hospitalInfo.HospCloseMon= 4000;

                        hospitalInfo.HospOpenTue = 0;
                        hospitalInfo.HospCloseTue = 4000;
                        
                        hospitalInfo.HospOpenWed = 0;
                        hospitalInfo.HospCloseWed = 4000;

                        hospitalInfo.HospOpenThu = 0;
                        hospitalInfo.HospCloseThu = 4000;

                        hospitalInfo.HospOpenFri = 0;
                        hospitalInfo.HospCloseFri = 4000;

                        hospitalInfo.HospOpenSat = 0;
                        hospitalInfo.HospCloseSat= 4000;

                        hospitalInfo.HospOpenSun = 0;
                        hospitalInfo.HospCloseSun = 4000;

                        hospitalInfo.HospOpenVac = 0;
                        hospitalInfo.HospCloseVac = 4000
                    } else {
                        hospitalInfo.HospOpenMon = req.body.openTime[0]*100+req.body.openTime[1]*1;
                        hospitalInfo.HospCloseMon= req.body.closedTime[0]*100+req.body.closedTime[1]*1;

                        hospitalInfo.HospOpenTue = req.body.openTime[2]*100+req.body.openTime[3]*1;
                        hospitalInfo.HospCloseTue = req.body.closedTime[2]*100+req.body.closedTime[3]*1;
                        
                        hospitalInfo.HospOpenWed = req.body.openTime[4]*100+req.body.openTime[5]*1;
                        hospitalInfo.HospCloseWed = req.body.closedTime[4]*100+req.body.closedTime[5]*1;

                        hospitalInfo.HospOpenThu = req.body.openTime[6]*100+req.body.openTime[7]*1;
                        hospitalInfo.HospCloseThu = req.body.closedTime[6]*100+req.body.closedTime[7]*1;

                        hospitalInfo.HospOpenFri = req.body.openTime[8]*100+req.body.openTime[9]*1;
                        hospitalInfo.HospCloseFri = req.body.closedTime[8]*100+req.body.closedTime[9]*1;

                        hospitalInfo.HospOpenSat = req.body.openTime[10]*100+req.body.openTime[11]*1;
                        hospitalInfo.HospCloseSat= req.body.closedTime[10]*100+req.body.closedTime[11]*1;

                        hospitalInfo.HospOpenSun = req.body.openTime[12]*100+req.body.openTime[13]*1;
                        hospitalInfo.HospCloseSun = req.body.closedTime[12]*100+req.body.closedTime[13]*1;

                        hospitalInfo.HospOpenVac = req.body.openTime[14]*100+req.body.openTime[15]*1;
                        hospitalInfo.HospCloseVac = req.body.closedTime[14]*100+req.body.closedTime[15]*1;

                    }
            
                    if (req.body.noBreak == "true") {
                        hospitalInfo.breakStart = null;
                        hospitalInfo.breakEnd = null;
            
                    } else {
                        hospitalInfo.breakStart = req.body.breakStart[0] * 100 + req.body.breakStart[1] * 1;
                        hospitalInfo.breakEnd = req.body.breakEnd[0] * 100 + req.body.breakEnd[1] * 1;
                    }
                }
            
                else {
                    res.send("뭔가 잘못됨...!");
                }
            })
            .then(()=>{
                if(compInfo.type=="H"){
                    createHospital();
                }
                ownerTrue();
            })
            .catch((err)=>{
                company.destroy({where: {compId : compInfo.compId}}); // 업체별 정보 db 저장 에러 시 company 정보도 삭제
            })
    }).catch((err) => {
        console.log(err);
    })
};


function createHospital() {
    Hosp.create({
        HospOpenMon: hospitalInfo.HospOpenMon,
        HospCloseMon: hospitalInfo.HospCloseMon,

        HospOpenTue: hospitalInfo.HospOpenTue,
        HospCloseTue: hospitalInfo.HospCloseTue,

        HospOpenWed: hospitalInfo.HospOpenWed,
        HospCloseWed: hospitalInfo.HospCloseWed,

        HospOpenThu: hospitalInfo.HospOpenThu,
        HospCloseThu: hospitalInfo.HospCloseThu,

        HospOpenFri: hospitalInfo.HospOpenFri,
        HospCloseFri: hospitalInfo.HospCloseFri,

        HospOpenSat: hospitalInfo.HospOpenSat,
        HospCloseSat: hospitalInfo.HospCloseSat,

        HospOpenSun: hospitalInfo.HospOpenSun,
        HospCloseSun: hospitalInfo.HospCloseSun,

        HospOpenVac: hospitalInfo.HospOpenVac,
        HospCloseVac: hospitalInfo.HospCloseVac,

        HospType: hospitalInfo.HospType,

        content: hospitalInfo.content,

        breakStart: hospitalInfo.breakStart,
        breakEnd: hospitalInfo.breakEnd,

        compId : hospitalInfo.compId
    });
}

function ownerTrue(){
    User.update({isOwner: 1}, {where: {id : compInfo.userId}});
}