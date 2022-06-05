require('dotenv').config();
const db = require("../../models/index");
const { Op } = require("sequelize");
const Company = db.company;
const CompanyRestaurantView = db.companyRestaurantView;
const CompanyCafeView = db.CompanyCafeView;
const CompanyHospitalView = db.companyHospitalView;
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];
const { QueryTypes } = require('sequelize');
const request = require('request');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
let holiday_date = [];
let today = new Date();
const day = today.getDay();
const date = today.getDate();
let hour = today.getHours();
if(hour < 6){
    hour += 24;
}
let minute = today.getMinutes();
if(minute < 10){
    minute = '0' + minute;
}
let now = String(hour) + minute;

request({
    url: `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=${process.env.HOLIDAY_APIKEY}&solYear=${today.getFullYear()}&solMonth=0${today.getMonth()+1}&_type=json`,
    method: 'GET'
}, async function (error, response, body) {
    const result = JSON.parse(body).response.body.items.item;
    for(let i=0; i < result.length; i++){
        holiday_date.push(result[i].locdate%100);
    }
});

exports.getAllPositions = async (req, res) => {
    try{
        if(day == 0){
            todayClosedRestaurantPosition = await CompanyRestaurantView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'restOpen', 'restClosed', 'breakStart', 'breakEnd', 'latitude', 'longitude'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    [Op.or]: [
                        { todayClosed:1 },
                        { sun:1 },
                        { vacation:1 }
                    ],
                    type: 'R'
                }
            });
            todayClosedCafePosition = await CompanyCafeView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'cafeOpen', 'cafeClosed', 'cafeType', 'latitude', 'longitude'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    [Op.or]: [
                        { todayClosed:1},
                        { sun:1 },
                        { vacation:1 }
                    ],
                    type: 'C'
                }
            });
            todayClosedHospitalPosition = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', 'breakStart', 'breakEnd'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    [Op.or]: [
                        { todayClosed:1 },
                        { sun:1 },
                        { vacation:1 }
                    ],
                    type: 'H'
                }
            });
            todayOpened = await Company.findAll({
                attributes: ['compId'],
                where:{
                    [Op.and]: [
                        { todayClosed:0},
                        { sun:0 },
                        { vacation:0 }
                    ]
                }
            });
        }else if(day == 1){
            todayClosedRestaurantPosition = await CompanyRestaurantView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'restOpen', 'restClosed', 'breakStart', 'breakEnd', 'latitude', 'longitude'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    [Op.or]: [
                        { todayClosed:1 },
                        { mon:1 },
                        { vacation:1 }
                    ],
                    type: 'R'
                }
            });
            todayClosedCafePosition = await CompanyCafeView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'cafeOpen', 'cafeClosed', 'cafeType', 'latitude', 'longitude'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    [Op.or]: [
                        { todayClosed:1 },
                        { mon:1 },
                        { vacation:1 }
                    ],
                    type: 'C'
                }
            });
            todayClosedHospitalPosition = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', 'breakStart', 'breakEnd'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    [Op.or]: [
                        { todayClosed:1 },
                        { mon:1 },
                        { vacation:1 }
                    ],
                    type: 'H'
                }
            });
            todayOpened = await Company.findAll({
                attributes: ['compId'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    [Op.and]: [
                        { todayClosed:0 },
                        { mon:0 },
                        { vacation:0 }
                    ]
                }
            });
        }else if(day == 2){
            todayClosedRestaurantPosition = await CompanyRestaurantView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'restOpen', 'restClosed', 'breakStart', 'breakEnd', 'latitude', 'longitude'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    [Op.or]: [
                        { todayClosed:1 },
                        { tue:1 },
                        { vacation:1 }
                    ],
                    type: 'R'
                }
            });
            todayClosedCafePosition = await CompanyCafeView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'cafeOpen', 'cafeClosed', 'cafeType', 'latitude', 'longitude'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    [Op.or]: [
                        { todayClosed:1 },
                        { tue:1 },
                        { vacation:1 }
                    ],
                    type: 'C'
                }
            });
            todayClosedHospitalPosition = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', 'breakStart', 'breakEnd'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    [Op.or]: [
                        { todayClosed:1 },
                        { tue:1 },
                        { vacation:1 }
                    ],
                    type: 'H'
                }
            });
            todayOpened = await Company.findAll({
                attributes: ['compId'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    [Op.and]: [
                        { todayClosed:0 },
                        { tue:0 },
                        { vacation:0 }
                    ]
                }
            });
        }else if(day == 3){
            todayClosedRestaurantPosition = await CompanyRestaurantView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'restOpen', 'restClosed', 'breakStart', 'breakEnd', 'latitude', 'longitude'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    [Op.or]: [
                        { todayClosed:1 },
                        { wed:1 },
                        { vacation:1 }
                    ],
                    type: 'R'
                }
            });
            todayClosedCafePosition = await CompanyCafeView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'cafeOpen', 'cafeClosed', 'cafeType', 'latitude', 'longitude'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    [Op.or]: [
                        { todayClosed:1 },
                        { wed:1 },
                        { vacation:1 }
                    ],
                    type: 'C'
                }
            });
            todayClosedHospitalPosition = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', 'HospOpenMon', 'HospCloseMon', 'breakStart', 'breakEnd'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    [Op.or]: [
                        { todayClosed:1 },
                        { wed:1 },
                        { vacation:1 }
                    ],
                    type: 'H'
                }
            });
            todayOpened = await Company.findAll({
                attributes: ['compId'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    [Op.and]: [
                        { todayClosed:0 },
                        { wed:0 },
                        { vacation:0 }
                    ]
                }
            });
        }else if(day == 4){
            todayClosedRestaurantPosition = await CompanyRestaurantView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'restOpen', 'restClosed', 'breakStart', 'breakEnd', 'latitude', 'longitude'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    [Op.or]: [
                        { todayClosed:1 },
                        { thu:1 },
                        { vacation:1 }
                    ],
                    type: 'R'
                }
            });
            todayClosedCafePosition = await CompanyCafeView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'cafeOpen', 'cafeClosed', 'cafeType', 'latitude', 'longitude'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    [Op.or]: [
                        { todayClosed:1 },
                        { thu:1 },
                        { vacation:1 }
                    ],
                    type: 'C'
                }
            });
            todayClosedHospitalPosition = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', 'breakStart', 'breakEnd'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    [Op.or]: [
                        { todayClosed:1 },
                        { thu:1 },
                        { vacation:1 }
                    ],
                    type: 'H'
                }
            });
            todayOpened = await Company.findAll({
                attributes: ['compId'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    [Op.and]: [
                        { todayClosed:0 },
                        { thu:0 },
                        { vacation:0 }
                    ]
                }
            });
        }else if(day == 5){
            todayClosedRestaurantPosition = await CompanyRestaurantView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'restOpen', 'restClosed', 'breakStart', 'breakEnd', 'latitude', 'longitude'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    [Op.or]: [
                        { todayClosed:1 },
                        { fri:1 },
                        { vacation:1 }
                    ],
                    type: 'R'
                }
            });
            todayClosedCafePosition = await CompanyCafeView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'cafeOpen', 'cafeClosed', 'cafeType', 'latitude', 'longitude'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    [Op.or]: [
                        { todayClosed:1 },
                        { fri:1 },
                        { vacation:1 }
                    ],
                    type: 'C'
                }
            });
            todayClosedHospitalPosition = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', 'breakStart', 'breakEnd'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    [Op.or]: [
                        { todayClosed:1 },
                        { fri:1 },
                        { vacation:1 }
                    ],
                    type: 'H'
                }
            });
            todayOpened = await Company.findAll({
                attributes: ['compId'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    [Op.and]: [
                        { todayClosed:0 },
                        { fri:0 },
                        { vacation:0 }
                    ]
                }
            });
        }else if(day == 6){
            todayClosedRestaurantPosition = await CompanyRestaurantView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'restOpen', 'restClosed', 'breakStart', 'breakEnd', 'latitude', 'longitude'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    [Op.or]: [
                        { todayClosed:1 },
                        { sat:1 },
                        { vacation:1 }
                    ],
                    type: 'R'
                }
            });
            todayClosedCafePosition = await CompanyCafeView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'cafeOpen', 'cafeClosed', 'cafeType', 'latitude', 'longitude'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    [Op.or]: [
                        { todayClosed:1 },
                        { sat:1 },
                        { vacation:1 }
                    ],
                    type: 'C'
                }
            });
            todayClosedHospitalPosition = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 'breakStart', 'breakEnd'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    [Op.or]: [
                        { todayClosed:1 },
                        { sat:1 },
                        { vacation:1 }
                    ],
                    type: 'H'
                }
            });
            todayOpened = await Company.findAll({
                attributes: ['compId'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    [Op.and]: [
                        { todayClosed:0 },
                        { sat:0 },
                        { vacation:0 }
                    ]
                }
            });
        };
        earlyClosedRestaurantPosition = await CompanyRestaurantView.findAll({
            attributes: ['compId', 'image', 'compName', 'address', 'tel', 'restOpen', 'restClosed', 'breakStart', 'breakEnd', 'latitude', 'longitude'],
            where:{
                latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                earlyClosed:1,
                type: 'R'
            }
        });
        earlyClosedCafePosition = await CompanyCafeView.findAll({
            attributes: ['compId', 'image', 'compName', 'address', 'tel', 'cafeOpen', 'cafeClosed', 'cafeType', 'latitude', 'longitude'],
            where:{
                latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                earlyClosed:1,
                type: 'C'
            }
        });
        if(day == 0){
            earlyClosedHospitalPosition = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', ['HospOpenSun', 'hospitalOpen'], ['HospCloseSun', 'hospitalClosed'], 'breakStart', 'breakEnd'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    earlyClosed:1,
                    type: 'H'
                }
            });
        }else if(day == 1){
            earlyClosedHospitalPosition = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', ['HospOpenMon', 'hospitalOpen'], ['HospCloseMon', 'hospitalClosed'], 'breakStart', 'breakEnd'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    earlyClosed:1,
                    type: 'H'
                }
            });
        }else if(day == 2){
            earlyClosedHospitalPosition = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', ['HospOpenTue', 'hospitalOpen'], ['HospCloseTue', 'hospitalClosed'], 'breakStart', 'breakEnd'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    earlyClosed:1,
                    type: 'H'
                }
            });
        }else if(day == 3){
            earlyClosedHospitalPosition = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', ['HospOpenWed', 'hospitalOpen'], ['HospCloseWed', 'hospitalClosed'], 'breakStart', 'breakEnd'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    earlyClosed:1,
                    type: 'H'
                }
            });
        }else if(day == 4){
            earlyClosedHospitalPosition = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', ['HospOpenThu', 'hospitalOpen'], ['HospCloseThu', 'hospitalClosed'], 'breakStart', 'breakEnd'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    earlyClosed:1,
                    type: 'H'
                }
            });
        }else if(day == 5){
            earlyClosedHospitalPosition = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', ['HospOpenFri', 'hospitalOpen'], ['HospCloseFri', 'hospitalClosed'], 'breakStart', 'breakEnd'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    earlyClosed:1,
                    type: 'H'
                }
            });
        }else if(day == 6){
            earlyClosedHospitalPosition = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', ['HospOpenSat', 'hospitalOpen'], ['HospCloseSat', 'hospitalClosed'], 'breakStart', 'breakEnd'],
                where:{
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    earlyClosed:1,
                    type: 'H'
                }
            });
        }
        let openedCompany_R = new Array();
        let openedCompany_C = new Array();
        let openedCompany_H = new Array();
        todayOpened.filter((company) => company.type == 'R').forEach((company) => openedCompany_R.push(company.compId));
        todayOpened.filter((company) => company.type == 'C').forEach((company) => openedCompany_C.push(company.compId));
        todayOpened.filter((company) => company.type == 'H').forEach((company) => openedCompany_H.push(company.compId));

        openedRestaurant = await CompanyRestaurantView.findAll({
            attributes: ['compId', 'image', 'compName', 'address', 'tel', 'restOpen', 'restClosed', 'breakStart', 'breakEnd', 'latitude', 'longitude'],
            where: {
                latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                compId:{
                    [Op.or]: [...openedCompany_R],
                },
                restOpen:{
                    [Op.lte]: parseInt(now)
                },
                restClosed:{
                    [Op.gt]: parseInt(now)
                }
            }
        });
        closedRestaurant = await CompanyRestaurantView.findAll({
            attributes: ['compId', 'image', 'compName', 'address', 'tel', 'restOpen', 'restClosed', 'breakStart', 'breakEnd', 'latitude', 'longitude'],
            where: {
                latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                compId:{
                    [Op.or]: [...openedCompany_R],
                },
                [Op.or]: {
                    restOpen:{
                        [Op.gt]: parseInt(now)
                    },
                    restClosed:{
                        [Op.lte]: parseInt(now)
                    }
                }
            }
        });

        openedCafe = await CompanyCafeView.findAll({
            attributes: ['compId', 'image', 'compName', 'address', 'tel', 'cafeOpen', 'cafeClosed', 'cafeType', 'latitude', 'longitude'],
            where: {
                latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                compId:{
                    [Op.or]: [...openedCompany_C]
                },
                cafeOpen:{
                    [Op.lte]: parseInt(now)
                },
                cafeClosed:{
                    [Op.gt]: parseInt(now)
                }
            }
        });

        closedCafe = await CompanyCafeView.findAll({
            attributes: ['compId', 'image', 'compName', 'address', 'tel', 'cafeOpen', 'cafeClosed', 'cafeType', 'latitude', 'longitude'],
            where: {
                latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                compId:{
                    [Op.or]: [...openedCompany_C],
                },
                [Op.or]: {
                    cafeOpen:{
                        [Op.gt]: parseInt(now)
                    },
                    cafeClosed:{
                        [Op.lte]: parseInt(now)
                    }
                }
            }
        });

        if(holiday_date.includes(date)){
            openedHospital = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', ['HospOpenVac', 'hospitalOpen'], ['HospCloseVac', 'hospitalClosed'], 'breakStart', 'breakEnd'],
                where: {
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    compId:{
                        [Op.or]: [...openedCompany_H]
                    },
                    HospOpenSun:{
                        [Op.lte]: parseInt(now)
                    },
                    HospCloseSun:{
                        [Op.gt]: parseInt(now)
                    }
                }
            });
            closedHospital = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', ['HospOpenVac', 'hospitalOpen'], ['HospCloseVac', 'hospitalClosed'], 'breakStart', 'breakEnd'],
                where: {
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    compId:{
                        [Op.or]: [...openedCompany_H],
                    },
                    [Op.or]:{
                        HospOpenSun:{
                            [Op.gt]: parseInt(now)
                        },
                        HospCloseSun:{
                            [Op.lte]: parseInt(now)
                        }
                    }
                }
            });
        }else if(day == 0){
            openedHospital = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', ['HospOpenSun', 'hospitalOpen'], ['HospCloseSun', 'hospitalClosed'], 'breakStart', 'breakEnd'],
                where: {
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    compId:{
                        [Op.or]: [...openedCompany_H]
                    },
                    HospOpenSun:{
                        [Op.lte]: parseInt(now)
                    },
                    HospCloseSun:{
                        [Op.gt]: parseInt(now)
                    }
                }
            });
            closedHospital = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', ['HospOpenSun', 'hospitalOpen'], ['HospCloseSun', 'hospitalClosed'], 'breakStart', 'breakEnd'],
                where: {
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    compId:{
                        [Op.or]: [...openedCompany_H],
                    },
                    [Op.or]:{
                        HospOpenSun:{
                            [Op.gt]: parseInt(now)
                        },
                        HospCloseSun:{
                            [Op.lte]: parseInt(now)
                        }
                    }
                }
            });
        }else if(day == 1){
            openedHospital = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', ['HospOpenMon', 'hospitalOpen'], ['HospCloseMon', 'hospitalClosed'], 'breakStart', 'breakEnd'],
                where: {
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    compId:{
                        [Op.or]: [...openedCompany_H]
                    },
                    HospOpenMon:{
                        [Op.lte]: parseInt(now)
                    },
                    HospCloseMon:{
                        [Op.gt]: parseInt(now)
                    }
                }
            });
            closedHospital = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', ['HospOpenMon', 'hospitalOpen'], ['HospCloseMon', 'hospitalClosed'], 'breakStart', 'breakEnd'],
                where: {
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    compId:{
                        [Op.or]: [...openedCompany_H],
                    },
                    [Op.or]:{
                        HospOpenMon:{
                            [Op.gt]: parseInt(now)
                        },
                        HospCloseMon:{
                            [Op.lte]: parseInt(now)
                        }
                    }
                }
            });
        }else if(day == 2){
            openedHospital = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', ['HospOpenTue', 'hospitalOpen'], ['HospCloseTue', 'hospitalClosed'], 'breakStart', 'breakEnd'],
                where: {
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    compId:{
                        [Op.or]: [...openedCompany_H]
                    },
                    HospOpenTue:{
                        [Op.lte]: parseInt(now)
                    },
                    HospCloseTue:{
                        [Op.gt]: parseInt(now)
                    }
                }
            });
            closedHospital = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', ['HospOpenTue', 'hospitalOpen'], ['HospCloseTue', 'hospitalClosed'], 'breakStart', 'breakEnd'],
                where: {
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    compId:{
                        [Op.or]: [...openedCompany_H],
                    },
                    [Op.or]:{
                        HospOpenTue:{
                            [Op.gt]: parseInt(now)
                        },
                        HospCloseTue:{
                            [Op.lte]: parseInt(now)
                        }
                    }
                }
            });
        }else if(day == 3){
            openedHospital = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', ['HospOpenWed', 'hospitalOpen'], ['HospCloseWed', 'hospitalClosed'], 'breakStart', 'breakEnd'],
                where: {
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    compId:{
                        [Op.or]: [...openedCompany_H]
                    },
                    HospOpenWed:{
                        [Op.lte]: parseInt(now)
                    },
                    HospCloseWed:{
                        [Op.gt]: parseInt(now)
                    }
                }
            });
            closedHospital = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', ['HospOpenWed', 'hospitalOpen'], ['HospCloseWed', 'hospitalClosed'], 'breakStart', 'breakEnd'],
                where: {
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    compId:{
                        [Op.or]: [...openedCompany_H],
                    },
                    [Op.or]:{
                        HospOpenWed:{
                            [Op.gt]: parseInt(now)
                        },
                        HospCloseWed:{
                            [Op.lte]: parseInt(now)
                        }
                    }
                }
            });
        }else if(day == 4){
            openedHospital = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', ['HospOpenThu', 'hospitalOpen'], ['HospCloseThu', 'hospitalClosed'], 'breakStart', 'breakEnd'],
                where: {
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    compId:{
                        [Op.or]: [...openedCompany_H]
                    },
                    HospOpenThu:{
                        [Op.lte]: parseInt(now)
                    },
                    HospCloseThu:{
                        [Op.gt]: parseInt(now)
                    }
                }
            });
            closedHospital = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', ['HospOpenThu', 'hospitalOpen'], ['HospCloseThu', 'hospitalClosed'], 'breakStart', 'breakEnd'],
                where: {
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    compId:{
                        [Op.or]: [...openedCompany_H],
                    },
                    [Op.or]:{
                        HospOpenThu:{
                            [Op.gt]: parseInt(now)
                        },
                        HospCloseThu:{
                            [Op.lte]: parseInt(now)
                        }
                    }
                }
            });
        }else if(day == 5){
            openedHospital = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', ['HospOpenFri', 'hospitalOpen'], ['HospCloseFri', 'hospitalClosed'], 'breakStart', 'breakEnd'],
                where: {
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    compId:{
                        [Op.or]: [...openedCompany_H]
                    },
                    HospOpenFri:{
                        [Op.lte]: parseInt(now)
                    },
                    HospCloseFri:{
                        [Op.gt]: parseInt(now)
                    }
                }
            });
            closedHospital = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', ['HospOpenFri', 'hospitalOpen'], ['HospCloseFri', 'hospitalClosed'], 'breakStart', 'breakEnd'],
                where: {
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    compId:{
                        [Op.or]: [...openedCompany_H],
                    },
                    [Op.or]:{
                        HospOpenFri:{
                            [Op.gt]: parseInt(now)
                        },
                        HospCloseFri:{
                            [Op.lte]: parseInt(now)
                        }
                    }
                }
            });
        }else if(day == 6){
            openedHospital = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', ['HospOpenSat', 'hospitalOpen'], ['HospCloseSat', 'hospitalClosed'], 'breakStart', 'breakEnd'],
                where: {
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    compId:{
                        [Op.or]: [...openedCompany_H]
                    },
                    HospOpenSat:{
                        [Op.lte]: parseInt(now)
                    },
                    HospCloseSat:{
                        [Op.gt]: parseInt(now)
                    }
                }
            });
            closedHospital = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'latitude', 'longitude', ['HospOpenSat', 'hospitalOpen'], ['HospCloseSat', 'hospitalClosed'], 'breakStart', 'breakEnd'],
                where: {
                    latitude : {[Op.between]: [req.body.swLat, req.body.neLat]},
                    longitude : {[Op.between]: [req.body.swLng, req.body.neLng]},
                    compId:{
                        [Op.or]: [...openedCompany_H],
                    },
                    [Op.or]:{
                        HospOpenSat:{
                            [Op.gt]: parseInt(now)
                        },
                        HospCloseSat:{
                            [Op.lte]: parseInt(now)
                        }
                    }
                }
            });
        }
        let myPlaces = await sequelize.query(`SELECT * FROM myplace WHERE UserId='${req.session.user_id}';`, { type: QueryTypes.SELECT });
        let myPlaceId = [];
        myPlaces.forEach(p => {
            myPlaceId.push(p.CompanyCompId);
        });

    let closedRestaurantPositionTotal = new Array(earlyClosedRestaurantPosition);
    closedRestaurantPositionTotal = [...closedRestaurant];
    let closedCafePositionTotal = new Array(earlyClosedCafePosition);
    closedCafePositionTotal = [...closedCafe];
    let closedHospitalPositionTotal = new Array(earlyClosedHospitalPosition);
    closedHospitalPositionTotal = [...closedHospital];

    for(let i=0; i < todayClosedRestaurantPosition.length; i++){
        todayClosedRestaurantPosition[i].dataValues.type = 'tcr';
        todayClosedRestaurantPosition[i].dataValues.isMyPlace = false;
    }

    for(let i=0; i < todayClosedCafePosition.length; i++){
        todayClosedCafePosition[i].dataValues.type = 'tcc';
        todayClosedCafePosition[i].dataValues.isMyPlace = false;
    }

    for(let i=0; i < todayClosedHospitalPosition.length; i++){
        todayClosedHospitalPosition[i].dataValues.type = 'tch';
        todayClosedHospitalPosition[i].dataValues.isMyPlace = false;
    }

    for(let i=0; i < openedRestaurant.length; i++){
        openedRestaurant[i].dataValues.type = 'or';
        openedRestaurant[i].dataValues.isMyPlace = false;
    }

    for(let i=0; i < openedCafe.length; i++){
        openedCafe[i].dataValues.type = 'oc';
        openedCafe[i].dataValues.isMyPlace = false;
    }

    for(let i=0; i < openedHospital.length; i++){
        openedHospital[i].dataValues.type = 'oh';
        openedHospital[i].dataValues.isMyPlace = false;
    }

    for(let i=0; i < closedRestaurantPositionTotal.length; i++){
        closedRestaurantPositionTotal[i].dataValues.type = 'cr';
        closedRestaurantPositionTotal[i].dataValues.isMyPlace = false;
    }

    for(let i=0; i < closedCafePositionTotal.length; i++){
        closedCafePositionTotal[i].dataValues.type = 'cc';
        closedCafePositionTotal[i].dataValues.isMyPlace = false;
    }

    for(let i=0; i < closedHospitalPositionTotal.length; i++){
        closedHospitalPositionTotal[i].dataValues.type = 'ch';
        closedHospitalPositionTotal[i].dataValues.isMyPlace = false;
    }

    res.json({
        todayClosedRestaurant : todayClosedRestaurantPosition, todayClosedCafe :  todayClosedCafePosition, todayClosedHospital : todayClosedHospitalPosition , 
        openedRestaurant : openedRestaurant, openedCafe : openedCafe, openedHospital : openedHospital,
        closedRestaurantTotal : closedRestaurantPositionTotal, closedCafeTotal : closedCafePositionTotal, closedHospitalTotal : closedHospitalPositionTotal,
        });

    }catch(err){
        res.status(500).send({
            message: err.message
        });
    }
};