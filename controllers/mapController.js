require('dotenv').config();
const db = require("../models/index");
const { Op } = require("sequelize");
const Company = db.company;
const CompanyRestaurantView = db.companyRestaurantView;
const CompanyCafeView = db.CompanyCafeView;
const CompanyHospitalView = db.companyHospitalView;

let today = new Date();
const day = today.getDay();
let hour = today.getHours();
if(hour < 6){
    hour += 24;
}
let minute = today.getMinutes();
if(minute < 10){
    minute = '0' + minute;
}
let now = String(hour) + minute;

exports.getAllPositions = async (req, res) => {
    try{
        if(day == 0){
            todayClosedRestaurantPosition = await CompanyRestaurantView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'restOpen', 'restClosed', 'breakStart', 'breakEnd', 
                'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { sun:1 },
                        { vacation:1 }
                    ],
                    type: 'R'
                }
            });
            todayClosedCafePosition = await CompanyCafeView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'cafeOpen', 'cafeClosed', 'cafeType', 
                'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
                where:{
                    [Op.or]: [
                        { todayClosed:1},
                        { sun:1 },
                        { vacation:1 }
                    ],
                    type: 'C'
                }
            });
            todayClosedHospitalPosition = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 
                'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'HospOpenMon', 'HospCloseMon', 'HospOpenTue', 'HospCloseTue', 'HospOpenWed', 'HospCloseWed', 
                'HospOpenThu', 'HospCloseThu', 'HospOpenFri', 'HospCloseFri', 'HospOpenSat', 'HospCloseSat', 'HospOpenSun', 'HospCloseSun', 'HospOpenVac', 'HospCloseVac', 'breakStart', 'breakEnd'],
                where:{
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
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'restOpen', 'restClosed', 'breakStart', 'breakEnd', 
                'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { mon:1 },
                        { vacation:1 }
                    ],
                    type: 'R'
                }
            });
            todayClosedCafePosition = await CompanyCafeView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'cafeOpen', 'cafeClosed', 'cafeType', 
                'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { mon:1 },
                        { vacation:1 }
                    ],
                    type: 'C'
                }
            });
            todayClosedHospitalPosition = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 
                'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'HospOpenMon', 'HospCloseMon', 'HospOpenTue', 'HospCloseTue', 'HospOpenWed', 'HospCloseWed', 
                'HospOpenThu', 'HospCloseThu', 'HospOpenFri', 'HospCloseFri', 'HospOpenSat', 'HospCloseSat', 'HospOpenSun', 'HospCloseSun', 'HospOpenVac', 'HospCloseVac', 'breakStart', 'breakEnd'],
                where:{
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
                    [Op.and]: [
                        { todayClosed:0 },
                        { mon:0 },
                        { vacation:0 }
                    ]
                }
            });
        }else if(day == 2){
            todayClosedRestaurantPosition = await CompanyRestaurantView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'restOpen', 'restClosed', 'breakStart', 'breakEnd', 
                'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { tue:1 },
                        { vacation:1 }
                    ],
                    type: 'R'
                }
            });
            todayClosedCafePosition = await CompanyCafeView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'cafeOpen', 'cafeClosed', 'cafeType', 
                'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { tue:1 },
                        { vacation:1 }
                    ],
                    type: 'C'
                }
            });
            todayClosedHospitalPosition = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 
                'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'HospOpenMon', 'HospCloseMon', 'HospOpenTue', 'HospCloseTue', 'HospOpenWed', 'HospCloseWed', 
                'HospOpenThu', 'HospCloseThu', 'HospOpenFri', 'HospCloseFri', 'HospOpenSat', 'HospCloseSat', 'HospOpenSun', 'HospCloseSun', 'HospOpenVac', 'HospCloseVac', 'breakStart', 'breakEnd'],
                where:{
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
                    [Op.and]: [
                        { todayClosed:0 },
                        { tue:0 },
                        { vacation:0 }
                    ]
                }
            });
        }else if(day == 3){
            todayClosedRestaurantPosition = await CompanyRestaurantView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'restOpen', 'restClosed', 'breakStart', 'breakEnd', 
                'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { wed:1 },
                        { vacation:1 }
                    ],
                    type: 'R'
                }
            });
            todayClosedCafePosition = await CompanyCafeView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'cafeOpen', 'cafeClosed', 'cafeType', 
                'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { wed:1 },
                        { vacation:1 }
                    ],
                    type: 'C'
                }
            });
            todayClosedHospitalPosition = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 
                'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'HospOpenMon', 'HospCloseMon', 'HospOpenTue', 'HospCloseTue', 'HospOpenWed', 'HospCloseWed', 
                'HospOpenThu', 'HospCloseThu', 'HospOpenFri', 'HospCloseFri', 'HospOpenSat', 'HospCloseSat', 'HospOpenSun', 'HospCloseSun', 'HospOpenVac', 'HospCloseVac', 'breakStart', 'breakEnd'],
                where:{
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
                    [Op.and]: [
                        { todayClosed:0 },
                        { wed:0 },
                        { vacation:0 }
                    ]
                }
            });
        }else if(day == 4){
            todayClosedRestaurantPosition = await CompanyRestaurantView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'restOpen', 'restClosed', 'breakStart', 'breakEnd', 
                'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { thu:1 },
                        { vacation:1 }
                    ],
                    type: 'R'
                }
            });
            todayClosedCafePosition = await CompanyCafeView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'cafeOpen', 'cafeClosed', 'cafeType', 
                'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { thu:1 },
                        { vacation:1 }
                    ],
                    type: 'C'
                }
            });
            todayClosedHospitalPosition = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 
                'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'HospOpenMon', 'HospCloseMon', 'HospOpenTue', 'HospCloseTue', 'HospOpenWed', 'HospCloseWed', 
                'HospOpenThu', 'HospCloseThu', 'HospOpenFri', 'HospCloseFri', 'HospOpenSat', 'HospCloseSat', 'HospOpenSun', 'HospCloseSun', 'HospOpenVac', 'HospCloseVac', 'breakStart', 'breakEnd'],
                where:{
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
                    [Op.and]: [
                        { todayClosed:0 },
                        { thu:0 },
                        { vacation:0 }
                    ]
                }
            });
        }else if(day == 5){
            todayClosedRestaurantPosition = await CompanyRestaurantView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'restOpen', 'restClosed', 'breakStart', 'breakEnd', 
                'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { fri:1 },
                        { vacation:1 }
                    ],
                    type: 'R'
                }
            });
            todayClosedCafePosition = await CompanyCafeView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'cafeOpen', 'cafeClosed', 'cafeType', 
                'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { fri:1 },
                        { vacation:1 }
                    ],
                    type: 'C'
                }
            });
            todayClosedHospitalPosition = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 
                'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'HospOpenMon', 'HospCloseMon', 'HospOpenTue', 'HospCloseTue', 'HospOpenWed', 'HospCloseWed', 
                'HospOpenThu', 'HospCloseThu', 'HospOpenFri', 'HospCloseFri', 'HospOpenSat', 'HospCloseSat', 'HospOpenSun', 'HospCloseSun', 'HospOpenVac', 'HospCloseVac', 'breakStart', 'breakEnd'],
                where:{
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
                    [Op.and]: [
                        { todayClosed:0 },
                        { fri:0 },
                        { vacation:0 }
                    ]
                }
            });
        }else if(day == 6){
            todayClosedRestaurantPosition = await CompanyRestaurantView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'restOpen', 'restClosed', 'breakStart', 'breakEnd', 
                'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { sat:1 },
                        { vacation:1 }
                    ],
                    type: 'R'
                }
            });
            todayClosedCafePosition = await CompanyCafeView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'cafeOpen', 'cafeClosed', 'cafeType', 
                'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { sat:1 },
                        { vacation:1 }
                    ],
                    type: 'C'
                }
            });
            todayClosedHospitalPosition = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 
                'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'HospOpenMon', 'HospCloseMon', 'HospOpenTue', 'HospCloseTue', 'HospOpenWed', 'HospCloseWed', 
                'HospOpenThu', 'HospCloseThu', 'HospOpenFri', 'HospCloseFri', 'HospOpenSat', 'HospCloseSat', 'HospOpenSun', 'HospCloseSun', 'HospOpenVac', 'HospCloseVac', 'breakStart', 'breakEnd'],
                where:{
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
                    [Op.and]: [
                        { todayClosed:0 },
                        { sat:0 },
                        { vacation:0 }
                    ]
                }
            });
        };
        earlyClosedRestaurantPosition = await CompanyRestaurantView.findAll({
            attributes: ['compId', 'image', 'compName', 'address', 'tel', 'restOpen', 'restClosed', 'breakStart', 'breakEnd', 
                'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
            where:{
                earlyClosed:1,
                type: 'R'
            }
        });
        earlyClosedCafePosition = await CompanyCafeView.findAll({
            attributes: ['compId', 'image', 'compName', 'address', 'tel', 'cafeOpen', 'cafeClosed', 'cafeType', 
                'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
            where:{
                earlyClosed:1,
                type: 'C'
            }
        });
        earlyClosedHospitalPosition = await CompanyHospitalView.findAll({
            attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 
                'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'HospOpenMon', 'HospCloseMon', 'HospOpenTue', 'HospCloseTue', 'HospOpenWed', 'HospCloseWed', 
                'HospOpenThu', 'HospCloseThu', 'HospOpenFri', 'HospCloseFri', 'HospOpenSat', 'HospCloseSat', 'HospOpenSun', 'HospCloseSun', 'HospOpenVac', 'HospCloseVac', 'breakStart', 'breakEnd'],
            where:{
                earlyClosed:1,
                type: 'H'
            }
        });
        let openedCompany_R = new Array();
        let openedCompany_C = new Array();
        let openedCompany_H = new Array();
        todayOpened.filter((company) => company.type == 'R').forEach((company) => openedCompany_R.push(company.compId));
        todayOpened.filter((company) => company.type == 'C').forEach((company) => openedCompany_C.push(company.compId));
        todayOpened.filter((company) => company.type == 'H').forEach((company) => openedCompany_H.push(company.compId));

        openedRestaurant = await CompanyRestaurantView.findAll({
            attributes: ['compId', 'image', 'compName', 'address', 'tel', 'restOpen', 'restClosed', 'breakStart', 'breakEnd', 
                'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
            where: {
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
            attributes: ['compId', 'image', 'compName', 'address', 'tel', 'restOpen', 'restClosed', 'breakStart', 'breakEnd', 
                'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
            where: {
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
            attributes: ['compId', 'image', 'compName', 'address', 'tel', 'cafeOpen', 'cafeClosed', 'cafeType', 
                'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
            where: {
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
            attributes: ['compId', 'image', 'compName', 'address', 'tel', 'cafeOpen', 'cafeClosed', 'cafeType', 
                'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
            where: {
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

        if(day == 0){
            openedHospital = await CompanyHospitalView.findAll({
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 
                'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'HospOpenMon', 'HospCloseMon', 'HospOpenTue', 'HospCloseTue', 'HospOpenWed', 'HospCloseWed', 
                'HospOpenThu', 'HospCloseThu', 'HospOpenFri', 'HospCloseFri', 'HospOpenSat', 'HospCloseSat', 'HospOpenSun', 'HospCloseSun', 'HospOpenVac', 'HospCloseVac', 'breakStart', 'breakEnd'],
                where: {
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
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 
                'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'HospOpenMon', 'HospCloseMon', 'HospOpenTue', 'HospCloseTue', 'HospOpenWed', 'HospCloseWed', 
                'HospOpenThu', 'HospCloseThu', 'HospOpenFri', 'HospCloseFri', 'HospOpenSat', 'HospCloseSat', 'HospOpenSun', 'HospCloseSun', 'HospOpenVac', 'HospCloseVac', 'breakStart', 'breakEnd'],
                where: {
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
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 
                'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'HospOpenMon', 'HospCloseMon', 'HospOpenTue', 'HospCloseTue', 'HospOpenWed', 'HospCloseWed', 
                'HospOpenThu', 'HospCloseThu', 'HospOpenFri', 'HospCloseFri', 'HospOpenSat', 'HospCloseSat', 'HospOpenSun', 'HospCloseSun', 'HospOpenVac', 'HospCloseVac', 'breakStart', 'breakEnd'],
                where: {
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
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 
                'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'HospOpenMon', 'HospCloseMon', 'HospOpenTue', 'HospCloseTue', 'HospOpenWed', 'HospCloseWed', 
                'HospOpenThu', 'HospCloseThu', 'HospOpenFri', 'HospCloseFri', 'HospOpenSat', 'HospCloseSat', 'HospOpenSun', 'HospCloseSun', 'HospOpenVac', 'HospCloseVac', 'breakStart', 'breakEnd'],
                where: {
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
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 
                'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'HospOpenMon', 'HospCloseMon', 'HospOpenTue', 'HospCloseTue', 'HospOpenWed', 'HospCloseWed', 
                'HospOpenThu', 'HospCloseThu', 'HospOpenFri', 'HospCloseFri', 'HospOpenSat', 'HospCloseSat', 'HospOpenSun', 'HospCloseSun', 'HospOpenVac', 'HospCloseVac', 'breakStart', 'breakEnd'],
                where: {
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
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 
                'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'HospOpenMon', 'HospCloseMon', 'HospOpenTue', 'HospCloseTue', 'HospOpenWed', 'HospCloseWed', 
                'HospOpenThu', 'HospCloseThu', 'HospOpenFri', 'HospCloseFri', 'HospOpenSat', 'HospCloseSat', 'HospOpenSun', 'HospCloseSun', 'HospOpenVac', 'HospCloseVac', 'breakStart', 'breakEnd'],
                where: {
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
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 
                'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'HospOpenMon', 'HospCloseMon', 'HospOpenTue', 'HospCloseTue', 'HospOpenWed', 'HospCloseWed', 
                'HospOpenThu', 'HospCloseThu', 'HospOpenFri', 'HospCloseFri', 'HospOpenSat', 'HospCloseSat', 'HospOpenSun', 'HospCloseSun', 'HospOpenVac', 'HospCloseVac', 'breakStart', 'breakEnd'],
                where: {
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
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 
                'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'HospOpenMon', 'HospCloseMon', 'HospOpenTue', 'HospCloseTue', 'HospOpenWed', 'HospCloseWed', 
                'HospOpenThu', 'HospCloseThu', 'HospOpenFri', 'HospCloseFri', 'HospOpenSat', 'HospCloseSat', 'HospOpenSun', 'HospCloseSun', 'HospOpenVac', 'HospCloseVac', 'breakStart', 'breakEnd'],
                where: {
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
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 
                'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'HospOpenMon', 'HospCloseMon', 'HospOpenTue', 'HospCloseTue', 'HospOpenWed', 'HospCloseWed', 
                'HospOpenThu', 'HospCloseThu', 'HospOpenFri', 'HospCloseFri', 'HospOpenSat', 'HospCloseSat', 'HospOpenSun', 'HospCloseSun', 'HospOpenVac', 'HospCloseVac', 'breakStart', 'breakEnd'],
                where: {
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
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 
                'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'HospOpenMon', 'HospCloseMon', 'HospOpenTue', 'HospCloseTue', 'HospOpenWed', 'HospCloseWed', 
                'HospOpenThu', 'HospCloseThu', 'HospOpenFri', 'HospCloseFri', 'HospOpenSat', 'HospCloseSat', 'HospOpenSun', 'HospCloseSun', 'HospOpenVac', 'HospCloseVac', 'breakStart', 'breakEnd'],
                where: {
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
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 
                'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'HospOpenMon', 'HospCloseMon', 'HospOpenTue', 'HospCloseTue', 'HospOpenWed', 'HospCloseWed', 
                'HospOpenThu', 'HospCloseThu', 'HospOpenFri', 'HospCloseFri', 'HospOpenSat', 'HospCloseSat', 'HospOpenSun', 'HospCloseSun', 'HospOpenVac', 'HospCloseVac', 'breakStart', 'breakEnd'],
                where: {
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
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 
                'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'HospOpenMon', 'HospCloseMon', 'HospOpenTue', 'HospCloseTue', 'HospOpenWed', 'HospCloseWed', 
                'HospOpenThu', 'HospCloseThu', 'HospOpenFri', 'HospCloseFri', 'HospOpenSat', 'HospCloseSat', 'HospOpenSun', 'HospCloseSun', 'HospOpenVac', 'HospCloseVac', 'breakStart', 'breakEnd'],
                where: {
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
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 
                'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'HospOpenMon', 'HospCloseMon', 'HospOpenTue', 'HospCloseTue', 'HospOpenWed', 'HospCloseWed', 
                'HospOpenThu', 'HospCloseThu', 'HospOpenFri', 'HospCloseFri', 'HospOpenSat', 'HospCloseSat', 'HospOpenSun', 'HospCloseSun', 'HospOpenVac', 'HospCloseVac', 'breakStart', 'breakEnd'],
                where: {
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
                attributes: ['compId', 'image', 'compName', 'address', 'tel', 'HospType', 'content', 'todayClosed', 'earlyClosed', 'vacation', 'latitude', 'longitude', 
                'type', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'HospOpenMon', 'HospCloseMon', 'HospOpenTue', 'HospCloseTue', 'HospOpenWed', 'HospCloseWed', 
                'HospOpenThu', 'HospCloseThu', 'HospOpenFri', 'HospCloseFri', 'HospOpenSat', 'HospCloseSat', 'HospOpenSun', 'HospCloseSun', 'HospOpenVac', 'HospCloseVac', 'breakStart', 'breakEnd'],
                where: {
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

        let closedRestaurantPositionTotal = new Array(earlyClosedRestaurantPosition);
        closedRestaurantPositionTotal = [...closedRestaurant];
        let closedCafePositionTotal = new Array(earlyClosedCafePosition);
        closedCafePositionTotal = [...closedCafe];
        let closedHospitalPositionTotal = new Array(earlyClosedHospitalPosition);
        closedHospitalPositionTotal = [...closedHospital];

        res.render("index", {
            todayClosedRestaurantPosition : todayClosedRestaurantPosition, todayClosedCafePosition :  todayClosedCafePosition, todayClosedHospitalPosition : todayClosedHospitalPosition , 
            openedRestaurantPosition : openedRestaurant, openedCafePosition : openedCafe, openedHospitalPosition : openedHospital,
            closedRestaurantPositionTotal : closedRestaurantPositionTotal, closedCafePositionTotal : closedCafePositionTotal, closedHospitalPositionTotal : closedHospitalPositionTotal,
            apikey : process.env.KAKAO_JS_KEY, title: "OpenMap"});
    }catch(err){
        res.status(500).send({
            message: err.message
        });
    }
};