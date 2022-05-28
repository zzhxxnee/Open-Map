require('dotenv').config();
const db = require("../models/index");
const { Op } = require("sequelize");
const Company = db.company;
const Restaurant = db.restaurant;
const Hospital = db.hospital;
const Cafe = db.cafe;

let today = new Date();
const day = today.getDay();
let hour = today.getHours();
let minute = today.getMinutes();
if(minute < 10){
    minute = '0' + minute;
}
let now = String(hour) + minute;

exports.getAllPositions = async (req, res) => {
    try{
        if(day == 0){
            todayClosedRestaurantPosition = await Company.findAll({
                attributes: ['compId', 'latitude', 'longitude'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { sun:1 }
                    ],
                    type: 'R'
                }
            });
            todayClosedCafePosition = await Company.findAll({
                attributes: ['compId', 'latitude', 'longitude'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { sun:1 }
                    ],
                    type: 'C'
                }
            });
            todayClosedHospitalPosition = await Company.findAll({
                attributes: ['compId', 'latitude', 'longitude'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { sun:1 }
                    ],
                    type: 'H'
                }
            });
            todayOpened = await Company.findAll({
                attributes: ['compId'],
                where:{
                    [Op.and]: [
                        { todayClosed:0 },
                        { sun:0 }
                    ]
                }
            });
        }else if(day == 1){
            todayClosedRestaurantPosition = await Company.findAll({
                attributes: ['compId', 'latitude', 'longitude'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { sun:1 }
                    ],
                    type: 'R'
                }
            });
            todayClosedCafePosition = await Company.findAll({
                attributes: ['compId', 'latitude', 'longitude'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { sun:1 }
                    ],
                    type: 'C'
                }
            });
            todayClosedHospitalPosition = await Company.findAll({
                attributes: ['compId', 'latitude', 'longitude'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { sun:1 }
                    ],
                    type: 'H'
                }
            });
            todayOpened = await Company.findAll({
                attributes: ['compId'],
                where:{
                    [Op.and]: [
                        { todayClosed:0 },
                        { sun:0 }
                    ]
                }
            });
        }else if(day == 2){
            todayClosedRestaurantPosition = await Company.findAll({
                attributes: ['compId', 'latitude', 'longitude'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { sun:1 }
                    ],
                    type: 'R'
                }
            });
            todayClosedCafePosition = await Company.findAll({
                attributes: ['compId', 'latitude', 'longitude'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { sun:1 }
                    ],
                    type: 'C'
                }
            });
            todayClosedHospitalPosition = await Company.findAll({
                attributes: ['compId', 'latitude', 'longitude'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { sun:1 }
                    ],
                    type: 'H'
                }
            });
            todayOpened = await Company.findAll({
                attributes: ['compId'],
                where:{
                    [Op.and]: [
                        { todayClosed:0 },
                        { sun:0 }
                    ]
                }
            });
        }else if(day == 3){
            todayClosedRestaurantPosition = await Company.findAll({
                attributes: ['compId', 'latitude', 'longitude'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { sun:1 }
                    ],
                    type: 'R'
                }
            });
            todayClosedCafePosition = await Company.findAll({
                attributes: ['compId', 'latitude', 'longitude'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { sun:1 }
                    ],
                    type: 'C'
                }
            });
            todayClosedHospitalPosition = await Company.findAll({
                attributes: ['compId', 'latitude', 'longitude'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { sun:1 }
                    ],
                    type: 'H'
                }
            });
            todayOpened = await Company.findAll({
                attributes: ['compId'],
                where:{
                    [Op.and]: [
                        { todayClosed:0 },
                        { sun:0 }
                    ]
                }
            });
        }else if(day == 4){
            todayClosedRestaurantPosition = await Company.findAll({
                attributes: ['compId', 'latitude', 'longitude'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { sun:1 }
                    ],
                    type: 'R'
                }
            });
            todayClosedCafePosition = await Company.findAll({
                attributes: ['compId', 'latitude', 'longitude'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { sun:1 }
                    ],
                    type: 'C'
                }
            });
            todayClosedHospitalPosition = await Company.findAll({
                attributes: ['compId', 'latitude', 'longitude'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { sun:1 }
                    ],
                    type: 'H'
                }
            });
            todayOpened = await Company.findAll({
                attributes: ['compId'],
                where:{
                    [Op.and]: [
                        { todayClosed:0 },
                        { sun:0 }
                    ]
                }
            });
        }else if(day == 5){
            todayClosedRestaurantPosition = await Company.findAll({
                attributes: ['compId', 'latitude', 'longitude'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { sun:1 }
                    ],
                    type: 'R'
                }
            });
            todayClosedCafePosition = await Company.findAll({
                attributes: ['compId', 'latitude', 'longitude'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { sun:1 }
                    ],
                    type: 'C'
                }
            });
            todayClosedHospitalPosition = await Company.findAll({
                attributes: ['compId', 'latitude', 'longitude'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { sun:1 }
                    ],
                    type: 'H'
                }
            });
            todayOpened = await Company.findAll({
                attributes: ['compId'],
                where:{
                    [Op.and]: [
                        { todayClosed:0 },
                        { sun:0 }
                    ]
                }
            });
        }else if(day == 6){
            todayClosedRestaurantPosition = await Company.findAll({
                attributes: ['compId', 'latitude', 'longitude'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { sun:1 }
                    ],
                    type: 'R'
                }
            });
            todayClosedCafePosition = await Company.findAll({
                attributes: ['compId', 'latitude', 'longitude'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { sun:1 }
                    ],
                    type: 'C'
                }
            });
            todayClosedHospitalPosition = await Company.findAll({
                attributes: ['compId', 'latitude', 'longitude'],
                where:{
                    [Op.or]: [
                        { todayClosed:1 },
                        { sun:1 }
                    ],
                    type: 'H'
                }
            });
            todayOpened = await Company.findAll({
                attributes: ['compId'],
                where:{
                    [Op.and]: [
                        { todayClosed:0 },
                        { sun:0 }
                    ]
                }
            });
        };
        earlyClosedRestaurantPosition = await Company.findAll({
            attributes: ['compId', 'latitude', 'longitude'],
            where:{
                earlyClosed:1,
                type: 'R'
            }
        });
        earlyClosedCafePosition = await Company.findAll({
            attributes: ['compId', 'latitude', 'longitude'],
            where:{
                earlyClosed:1,
                type: 'C'
            }
        });
        earlyClosedHospitalPosition = await Company.findAll({
            attributes: ['compId', 'latitude', 'longitude'],
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

        openedRestaurant = await Restaurant.findAll({
            attributes: ['compId'],
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
        closedRestaurant = await Restaurant.findAll({
            attributes: ['compId'],
            where: {
                compId:{
                    [Op.or]: [...openedCompany_R],
                },
                restOpen:{
                    [Op.gt]: parseInt(now)
                }
            }
        });

        openedCafe = await Cafe.findAll({
            attributes: ['compId'],
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

        closedCafe = await Cafe.findAll({
            attributes: ['compId'],
            where: {
                compId:{
                    [Op.or]: [...openedCompany_C],
                },
                cafeOpen:{
                    [Op.gt]: parseInt(now)
                }
            }
        });

        if(day == 0){
            openedHospital = await Hospital.findAll({
                attributes: ['compId'],
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
            closedHospital = await Hospital.findAll({
                attributes: ['compId'],
                where: {
                    compId:{
                        [Op.or]: [...openedCompany_H],
                    },
                    HospOpenSun:{
                        [Op.gt]: parseInt(now)
                    }
                }
            });
        }else if(day == 1){
            openedHospital = await Hospital.findAll({
                attributes: ['compId'],
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
            closedHospital = await Hospital.findAll({
                attributes: ['compId'],
                where: {
                    compId:{
                        [Op.or]: [...openedCompany_H],
                    },
                    HospOpenMon:{
                        [Op.gt]: parseInt(now)
                    }
                }
            });
        }else if(day == 2){
            openedHospital = await Hospital.findAll({
                attributes: ['compId'],
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
            closedHospital = await Hospital.findAll({
                attributes: ['compId'],
                where: {
                    compId:{
                        [Op.or]: [...openedCompany_H],
                    },
                    HospOpenTue:{
                        [Op.gt]: parseInt(now)
                    }
                }
            });
        }else if(day == 3){
            openedHospital = await Hospital.findAll({
                attributes: ['compId'],
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
            closedHospital = await Hospital.findAll({
                attributes: ['compId'],
                where: {
                    compId:{
                        [Op.or]: [...openedCompany_H],
                    },
                    HospOpenWed:{
                        [Op.gt]: parseInt(now)
                    }
                }
            });
        }else if(day == 4){
            openedHospital = await Hospital.findAll({
                attributes: ['compId'],
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
            closedHospital = await Hospital.findAll({
                attributes: ['compId'],
                where: {
                    compId:{
                        [Op.or]: [...openedCompany_H],
                    },
                    HospOpenThu:{
                        [Op.gt]: parseInt(now)
                    }
                }
            });
        }else if(day == 5){
            openedHospital = await Hospital.findAll({
                attributes: ['compId'],
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
            closedHospital = await Hospital.findAll({
                attributes: ['compId'],
                where: {
                    compId:{
                        [Op.or]: [...openedCompany_H],
                    },
                    HospOpenFri:{
                        [Op.gt]: parseInt(now)
                    }
                }
            });
        }else if(day == 6){
            openedHospital = await Hospital.findAll({
                attributes: ['compId'],
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
            closedHospital = await Hospital.findAll({
                attributes: ['compId'],
                where: {
                    compId:{
                        [Op.or]: [...openedCompany_H],
                    },
                    HospOpenSat:{
                        [Op.gt]: parseInt(now)
                    }
                }
            });
        }

        let openedRestaurantId = new Array();
        openedRestaurant.forEach(r => openedRestaurantId.push(r.compId));
        let openedCafeId = new Array();
        openedCafe.forEach(c => openedCafeId.push(c.compId));
        let openedHospitalId = new Array();
        openedHospital.forEach(h => openedHospitalId.push(h.compId));

        openedRestaurantPosition = await Company.findAll({
            attributes: ['compId', 'latitude', 'longitude'],
            where: {
                compId:{
                    [Op.or]: [...openedRestaurantId],
                }
            }
        });
        openedCafePosition = await Company.findAll({
            attributes: ['compId', 'latitude', 'longitude'],
            where: {
                compId:{
                    [Op.or]: [...openedCafeId],
                }
            }
        });
        openedHospitalPosition = await Company.findAll({
            attributes: ['compId', 'latitude', 'longitude'],
            where: {
                compId:{
                    [Op.or]: [...openedHospitalId],
                }
            }
        });

        let closedRestaurantId = new Array();
        closedRestaurant.forEach(r => closedRestaurantId.push(r.dataValues.compId));
        let closedCafeId = new Array();
        closedCafe.forEach(c => closedCafeId.push(c.dataValues.compId));
        let closedHospitalId = new Array();
        closedHospital.forEach(h => closedHospitalId.push(h.dataValues.compId));

        closedRestaurantPosition = await Company.findAll({
            attributes: ['compId', 'latitude', 'longitude'],
            where: {
                compId:{
                    [Op.or]: [...closedRestaurantId],
                }
            }
        });
        closedCafePosition = await Company.findAll({
            attributes: ['compId', 'latitude', 'longitude'],
            where: {
                compId:{
                    [Op.or]: [...closedCafeId],
                }
            }
        });
        closedHospitalPosition = await Company.findAll({
            attributes: ['compId', 'latitude', 'longitude'],
            where: {
                compId:{
                    [Op.or]: [...closedHospitalId],
                }
            }
        });

        let closedRestaurantPositionTotal = new Array(earlyClosedRestaurantPosition);
        closedRestaurantPositionTotal = [...closedRestaurantPosition];
        let closedCafePositionTotal = new Array(earlyClosedCafePosition);
        closedCafePositionTotal = [...closedCafePosition];
        let closedHospitalPositionTotal = new Array(earlyClosedHospitalPosition);
        closedHospitalPositionTotal = [...closedHospitalPosition];

        res.render("index", {
            todayClosedRestaurantPosition : todayClosedRestaurantPosition, todayClosedCafePosition :  todayClosedCafePosition, todayClosedHospitalPosition : todayClosedHospitalPosition , 
            openedRestaurantPosition : openedRestaurantPosition, openedCafePosition : openedCafePosition, openedHospitalPosition : openedHospitalPosition,
            closedRestaurantPositionTotal : closedRestaurantPositionTotal, closedCafePositionTotal : closedCafePositionTotal, closedHospitalPositionTotal : closedHospitalPositionTotal,
            apikey : process.env.KAKAO_JS_KEY, title: "OpenMap"});
    }catch(err){
        res.status(500).send({
            message: err.message
        });
    }
};