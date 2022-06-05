const moment = require('moment');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('./../models');
const models = require('./../models');
const crypto = require('crypto');
var multer = require('multer');
var _storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb){
    cb(null, `${Date.now()}-${file.originalname}`);
  }
})
var upload = multer({ storage: _storage });

exports.showMyplaceList = async(req, res) => {
    let userid = req.session.user_id;
   
    if(!userid){
      res.redirect("/users/login");
    }

    myCafe = await sequelize.query(`SELECT * FROM company C JOIN cafe CA ON C.type = 'C' where C.compId in (SELECT CompanyCompId FROM myplace where UserId = '${userid}') AND CA.CompanyCompId = C.compId`, { type: QueryTypes.SELECT });
    myHosp = await sequelize.query(`SELECT * FROM company C JOIN hospital H ON C.type = 'H' where C.compId in (SELECT CompanyCompId FROM myplace where UserId = '${userid}') AND H.CompanyCompId = C.compId`, { type: QueryTypes.SELECT });
    myRest = await sequelize.query(`SELECT * FROM company C JOIN restaurant R ON C.type = 'R' where C.compId in (SELECT CompanyCompId FROM myplace where UserId = '${userid}') AND R.CompanyCompId = C.compId`, { type: QueryTypes.SELECT });
  
    let now = moment().format('Hmm') * 1;
    let today = moment().format('ddd').toLowerCase;

    myCafe.forEach(c => {
    
      if(c[today] || c.todayClosed || c.earlyClosed || c.vacation){
        c['status'] = "오늘휴무";
      } else if((now > c.cafeOpen && now < c.cafeClosed) || 
      (c.cafeClosed >=2400 && now+2400 > c.cafeOpen && now+2400 < c.cafeClosed)){
        c['status'] = '영업중'
      }
      else{
        c['status'] = "영업종료";
      }
      
      if(c.cafeClosed >= 2400){
        c.cafeClosed -= 2400;
      }
      if(c.cafeOpen == 0){
        c.cafeOpen ='000';
      }
      if(c.cafeClosed == 0){
        c.cafeClosed ='000';
      }

      c.cafeOpen = moment(`${c.cafeOpen}`,"Hmm").format('H:mm');
      c.cafeClosed = moment(`${c.cafeClosed}`, "Hmm").format('H:mm');
    });
  
    myRest.forEach(c => {

      if(c[today] || c.todayClosed || c.earlyClosed || c.vacation){
        c['status'] = "오늘휴무";
      } else if(c.breakStart && now >= c.breakStart && now <= c.breakEnd){
        c['status'] = "휴게시간";
      } else if((now > c.restOpen && now < c.restClosed) || 
      (c.restClosed >=2400 && now+2400 > c.restOpen && now+2400 < c.restClosed)){
        c['status'] = "영업중";
      }
      else{
        c['status'] = "영업종료";
      }

      if(c.restClosed >= 2400){
        c.restClosed -= 2400;
      }
      if(c.restOpen == 0){
        c.restOpen ='000';
      }
      if(c.restClosed == 0){
        c.restClosed ='000';
      }

      c.restOpen = moment(`${c.restOpen}`,"Hmm").format('H:mm');
      c.restClosed = moment(`${c.restClosed}`, "Hmm").format('H:mm');
      
    });
  
    today2 = moment().format('ddd');
    
    myHosp.forEach(c => {

      let HospOpen = c[`HospOpen${today2}`];
      let HospClosed = c[`HospClose${today2}`];

      if(c[today] || c.todayClosed || c.earlyClosed || c.vacation){
        c['status'] = "오늘휴무";
      } else if(c.breakStart && now >= c.breakStart && now <= c.breakEnd){
        c['status'] = "휴게시간";
      } else if((now > HospOpen && now < HospClosed) || 
      (HospClosed >=2400 && now+2400 > HospOpen && now+2400 < HospClosed)){
        c['status'] = "영업중";
      }
      else{
        c['status'] = "영업종료";
      }

      if(HospClosed >= 2400){
        HospClosed -= 2400;
      }
      if(HospClosed == 0){
        HospClosed ='000';
      }

      c['hospOpen'] = moment(`${HospOpen}`,"Hmm").format('H:mm');
      c['hospClosed'] = moment(`${HospClosed}`,"Hmm").format('H:mm');

    });
    res.render('MyPlaceList', {cafe:myCafe, hosp:myHosp, rest:myRest});
}


exports.deleteMyPlace = async(req, res) => {
  let compId = req.body.comp_id;
  await sequelize.query(`DELETE FROM myplace WHERE CompanyCompId = '${compId}'`, { type: QueryTypes.DELETE });
  res.redirect('/mypage/favorite');
}


exports.showMypage = async(req, res) => {
  let userid = req.session.user_id;
  if(!userid){
    res.redirect("/users/login");
  }
  else{
    let isOwner =  {isOwner:undefined}
    isOwner = await models.Users.findOne({
      attributes: ['isOwner'],
      where:{
        id:userid
      }
    });
    let myComp=[];
    if(Boolean(isOwner.isOwner)){
      myComp = await sequelize.query(`SELECT * FROM company where userId = '${userid}'`, { type: QueryTypes.SELECT });
    }
    res.render('MyPage',{user:userid, myComp:myComp, isOwner:isOwner.isOwner});
  }

}

exports.configcomp = async(req, res) => {
  if(req.body.comp_type == 'C'){
    let compId = req.body.comp_id;

    myCafe = await sequelize.query(`SELECT * FROM company C JOIN cafe CA ON C.compid = CA.CompanyCompId WHERE C.compid=${compId}`, { type: QueryTypes.SELECT });
    myCafe = myCafe[0];

    if(myCafe.cafeClosed >= 2400){
      myCafe.cafeClosed -= 2400;
    }
    if(myCafe.cafeClosed == 0){
      myCafe.cafeClosed ='000';
    }
    myCafe.cafeOpen = moment(`${myCafe.cafeOpen}`,"Hmm").format('HH:mm');
    myCafe.cafeClosed = moment(`${myCafe.cafeClosed}`,"Hmm").format('HH:mm');
    
    menu = await sequelize.query(`SELECT * FROM menu WHERE CompanyCompId = '${compId}'`, { type: QueryTypes.SELECT });
    res.render('configCafe',{myCafe:myCafe, menu:menu});

  } else if(req.body.comp_type == "R") {
    let compId = req.body.comp_id;

    myRest = await sequelize.query(`SELECT * FROM company C JOIN restaurant R ON C.compid = R.CompanyCompid WHERE C.compid=${compId}`, { type: QueryTypes.SELECT });
    myRest = myRest[0];
    
    if(myRest.restClosed >= 2400){
      myRest.restClosed -= 2400;
    }
    if(myRest.restOpen == 0){
      myRest.restOpen ='000';
    }
    if(myRest.restClosed == 0){
      myRest.restClosed ='000';
    }
    myRest.restOpen = moment(`${myRest.restOpen}`,"Hmm").format('HH:mm');
    myRest.restClosed = moment(`${myRest.restClosed}`,"Hmm").format('HH:mm');

    if(myRest.breakStart){
      myRest.breakStart = moment(`${myRest.breakStart}`,"Hmm").format('HH:mm');
      myRest.breakEnd = moment(`${myRest.breakEnd}`,"Hmm").format('HH:mm');
    }
    
    menu = await sequelize.query(`SELECT * FROM menu WHERE CompanyCompId = '${compId}'`, { type: QueryTypes.SELECT });
    //res.send(myRest);
    res.render('configRest',{myRest:myRest, menu:menu});
    
  } else if(req.body.comp_type == "H") {
    let compId = req.body.comp_id;
    myHosp = await sequelize.query(`SELECT * FROM company C JOIN hospital H ON C.compid = H.CompanyCompId WHERE C.compid=${compId}`, { type: QueryTypes.SELECT });
    myHosp = myHosp[0];


    menu = await sequelize.query(`SELECT * FROM menu WHERE CompanyCompId = '${compId}'`, { type: QueryTypes.SELECT });

    //res.send(myHosp);
    var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Vac'];
    days.forEach(d => {

      if(myHosp[`HospOpen${d}`] == 0){
        myHosp[`HospOpen${d}`] ='000';
      }
      if(myHosp[`HospClosed${d}`] == 0){
        myHosp[`HospOpen${d}`] ='000';
      }
      myHosp[`HospOpen${d}`] = moment(myHosp[`HospOpen${d}`],"Hmm").format('HH:mm');
      myHosp[`HospClose${d}`] = moment(myHosp[`HospClose${d}`],"Hmm").format('HH:mm');
      if(myHosp.breakStart){
        myHosp.breakStart = moment(`${myHosp.breakStart}`,"Hmm").format('HH:mm');
        myHosp.breakEnd = moment(`${myHosp.breakEnd}`,"Hmm").format('HH:mm');
      }
    });
    res.render('configHosp',{myHosp:myHosp, menu:menu, days:days});
  }
}

exports.configCafe = async(req, res) => {
  let compId = req.body.comp_id;
  let imagepath;
  
    if(req.file){
      imagepath = `/${req.file.filename}`;
    }
    else{
      imagepath = "/images/baseimg.jpg";
    }
  
    await models.company.update(
      {
        tel:req.body.telNum,
        image:imagepath,
        todayClosed:Boolean(req.body.todayClosed),
        earlyClosed:Boolean(req.body.earlyClosed),
        vacation:Boolean(req.body.vacation),
        mon:Boolean(req.body.mon),
        tue:Boolean(req.body.tue),
        wed:Boolean(req.body.wed),
        thu:Boolean(req.body.thu),
        fri:Boolean(req.body.fri),
        sat:Boolean(req.body.sat),
        sun:Boolean(req.body.sun)
      },
      {where: {
        compId:compId
      }}
    );
  
    let closed = `${req.body.closedTime}`.replaceAll(":","");
    if(Boolean(req.body.tomorrow)){
      closed = closed*1 + 2400;
    }
  
    await models.cafe.update(
      {
        cafeType:req.body.cafeType,
        cafeOpen:`${req.body.openTime}`.replaceAll(":",""),
        cafeClosed:closed
      },
      {where:{
          CompanyCompId:compId
      }}
    );
  
    await sequelize.query(`DELETE FROM menu WHERE CompanyCompId = '${compId}'`, { type: QueryTypes.DELETE });
  
    if(req.body.menu && !(typeof(req.body.menu)=='string')){
      let menu = Object.values(req.body.menu);
      let price = Object.values(req.body.price);
      var menuAndPrice = menu.map(function(menu, i) {
        return [menu, price[i]];
      });
  
      for await (const e of menuAndPrice){
        if(e[0]=="" || e[1]==""){continue;}
        await models.Menu.create({
          menuName:e[0],
          price:e[1],
          CompanyCompId:compId
        });
      }
      
    }else{
      if(req.body.menu){
      await models.Menu.create({
        menuName:req.body.menu,
        price:req.body.price,
        CompanyCompId:compId
      });
      }
        
    }
    //res.send('completed');
    //res.send(req.body);
    res.redirect('/mypage');
}

exports.configRest = async(req, res) => {
  
  let compId = req.body.comp_id;
  let imagepath;

  if(req.file){
    imagepath = `/${req.file.filename}`;
  }
  else{
    imagepath = "/images/baseimg.jpg";
  }
  await models.company.update(
    {
      tel:req.body.telNum,
      image:imagepath,
      todayClosed:Boolean(req.body.todayClosed),
      earlyClosed:Boolean(req.body.earlyClosed),
      vacation:Boolean(req.body.vacation),
      mon:Boolean(req.body.mon),
      tue:Boolean(req.body.tue),
      wed:Boolean(req.body.wed),
      thu:Boolean(req.body.thu),
      fri:Boolean(req.body.fri),
      sat:Boolean(req.body.sat),
      sun:Boolean(req.body.sun)
    },
    {where: {
      compId:compId
    }}
  );
  
  let closed = `${req.body.closedTime}`.replaceAll(":","");
  if(Boolean(req.body.tomorrow)){
    closed = closed*1 + 2400;
  }

  let breakStart = req.body.breakStart;
  if(Boolean(req.body.noBreak)){
    breakStart = null;
  }else{
    breakStart = `${req.body.breakStart}`.replaceAll(":","");
  }

  let breakEnd = req.body.breakEnd;
  if(Boolean(req.body.noBreak)){
    breakEnd = null;
  }else{
    breakEnd = `${req.body.breakEnd}`.replaceAll(":","");
  }
  
  await models.restaurant.update(
    {
      restType:req.body.restType,
      restOpen:`${req.body.openTime}`.replaceAll(":",""),
      restClosed:closed,
      breakStart:(breakStart ? breakStart : null) ,
      breakEnd:(breakEnd ? breakEnd : null)
    },
    {where:{
        CompanyCompId:compId
    }}
  );
  
  await sequelize.query(`DELETE FROM menu WHERE CompanyCompId = '${compId}'`, { type: QueryTypes.DELETE });

  if(req.body.menu && !(typeof(req.body.menu)=='string')){
    let menu = Object.values(req.body.menu);
    let price = Object.values(req.body.price);
    var menuAndPrice = menu.map(function(menu, i) {
      return [menu, price[i]];
    });

    for await (const e of menuAndPrice){
      if(e[0]=="" || e[1]==""){continue;}
      await models.Menu.create({
        menuName:e[0],
        price:e[1],
        CompanyCompId:compId
      });
    }
    
  }else{
    if(req.body.menu){
    await models.Menu.create({
      menuName:req.body.menu,
      price:req.body.price,
      CompanyCompId:compId
    });
    }
    
  }
  res.redirect('/mypage');
}

exports.configHosp = async(req, res) => {
  let compId = req.body.comp_id;
  let imagepath;

  if(req.file){
    imagepath = `/${req.file.filename}`;
  }
  else{
    imagepath = "/images/baseimg.jpg";
  }

  await models.company.update(
    {
      tel:req.body.telNum,
      image:imagepath,
      todayClosed:Boolean(req.body.todayClosed),
      earlyClosed:Boolean(req.body.earlyClosed),
      vacation:Boolean(req.body.vacation),
      mon:Boolean(req.body.mon),
      tue:Boolean(req.body.tue),
      wed:Boolean(req.body.wed),
      thu:Boolean(req.body.thu),
      fri:Boolean(req.body.fri),
      sat:Boolean(req.body.sat),
      sun:Boolean(req.body.sun)
    },
    {where: {
      compId:compId
    }}
  );

  let breakStart = req.body.breakStart;
  if(Boolean(req.body.noBreak)){
    breakStart = null;
  }else{
    breakStart = `${req.body.breakStart}`.replaceAll(":","");
  }

  let breakEnd = req.body.breakEnd;
  if(Boolean(req.body.noBreak)){
    breakEnd = null;
  }else{
    breakEnd = `${req.body.breakEnd}`.replaceAll(":","");
  }

  await models.hospital.update(
    {
      HospType:req.body.HospType,

      HospOpenMon:`${req.body.openMon}`.replaceAll(":",""),
      HospCloseMon:`${req.body.closedMon}`.replaceAll(":",""),

      HospOpenTue:`${req.body.openTue}`.replaceAll(":",""),
      HospCloseTue:`${req.body.closedTue}`.replaceAll(":",""),

      HospOpenWed:`${req.body.openWed}`.replaceAll(":",""),
      HospCloseWed:`${req.body.closedWed}`.replaceAll(":",""),

      HospOpenThu:`${req.body.openThu}`.replaceAll(":",""),
      HospCloseThu:`${req.body.closedThu}`.replaceAll(":",""),

      HospOpenFri:`${req.body.openFri}`.replaceAll(":",""),
      HospCloseFri:`${req.body.closedFri}`.replaceAll(":",""),

      HospOpenSat:`${req.body.openSat}`.replaceAll(":",""),
      HospCloseSat:`${req.body.closedSat}`.replaceAll(":",""),

      HospOpenSun:`${req.body.openSun}`.replaceAll(":",""),
      HospCloseSun:`${req.body.closedSun}`.replaceAll(":",""),

      HospOpenVac:`${req.body.openVac}`.replaceAll(":",""),
      HospCloseVac:`${req.body.closedVac}`.replaceAll(":",""),

      breakStart:(breakStart ? breakStart : null) ,
      breakEnd:(breakEnd ? breakEnd : null)
    },
    {where:{
        CompanyCompId:compId
    }}
  );
  res.redirect('/mypage');
}

exports.settingEmail = async(req, res) => {
  let userid = req.session.user_id;
  if(!userid){
    res.redirect("/users/login");
  }
  
  let result = await models.Users.findOne({
    where:{
      id:userid
    }
  });

  let dbPassword = result.dataValues.password;
  let inputPassword = req.body.password;
  let salt = result.dataValues.salt;
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  if(dbPassword === hashPassword){
    res.render('settingEmail2',{oldEmail:result.dataValues.email});
  }
  else{
      res.render('settingEmail');
    
  }
}

exports.settingEmail2 = async(req, res) => {
  let userid = req.session.user_id;
  if(!userid){
    res.redirect("/users/login");
  }
  await sequelize.query(`UPDATE users SET email = ? WHERE id = '${userid}'`, {replacements:[`${req.body.new_email}`], type: QueryTypes.UPDATE });
  res.redirect('/users/MyPage');
}

exports.leave_confirmPwd = async(req, res) => {
  let userid = req.session.user_id;
  if(!userid){
    res.redirect("/users/login");
  }
  
  let result = await models.Users.findOne({
    where:{
      id:userid
    }
  });

  let dbPassword = result.dataValues.password;
  let inputPassword = req.body.password;
  let salt = result.dataValues.salt;
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  if(dbPassword === hashPassword){
    res.render('leaveMember2',{oldEmail:result.dataValues.email});
  }
  else{
      res.render('leaveMember');
    
  }

}
exports.leave_thanks = async(req, res) => {
  let userid = req.session.user_id;
  if(!userid){
    res.redirect("/users/login");
  }

  try {
    await sequelize.query(`DELETE FROM users WHERE id = '${userid}'`, { type: QueryTypes.DELETE });
  } catch (e) {
    res.redirect("/");
  }
  req.session.destroy();
  res.clearCookie('sid');

  res.render('leaveMemberConfirm');
}

exports.delete_comp = async(req,res) => {
  let compId = req.body.comp_id;
  await sequelize.query(`DELETE FROM company WHERE compId = '${compId}'`, { type: QueryTypes.DELETE });
  res.redirect('/mypage');
}