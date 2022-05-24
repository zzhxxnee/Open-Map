var express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { response } = require('../app');
var router = express.Router();
const models = require('./../models');
const crypto = require('crypto');
let session = require('express-session');
const { runInNewContext } = require('vm');
const db = require('./../models');
const nodemailer = require('nodemailer');


/* GET users listing. */
router.get('/', function(req, res, next) {
        res.send('respond with a resource');
});

router.get('/sign_up', function(req, res, next) {
  res.render("signup.ejs");
});

router.post("/sign_up", async function(req,res,next){
  let body = req.body;

  if(!body.userid){
    res.status(400).send({
      message : "Content can not be empty!"
    });
    return;
  }
  
  let exUser = await models.Users.findOne({ // 아이디 중복여부 체크
    where:{
      id : body.userid
    }
  })

  if(exUser){
    // res.status(500).send({
    //   message : "중복된 아이디 입니다!"
    // });
    res.status(500).send(`<script>alert('중복된 아이디입니다');history.go(-1);</script>`);
    return;
  }else{
    res.send(`<script>alert('사용 가능한 아이디입니다');history.go(-1);</script>`);
    return;
  }

  let inputPassword = body.password; // 비밀번호 암호화 저장 유저 정보가 저장된 salt 사용
  let salt = Math.round((new Date().valueOf() * Math.random())) + "";
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  const userInfo = ({
    id : body.userid,
    name: body.username,
    password: hashPassword,
    email: body.email,
    salt: salt
  })

  models.Users.create(userInfo)
  .then( result => {
    res.status(200).send(result);
  })
  .catch((err) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Tutorial."
    });
  });
});


router.get('/login', function(req, res, next) {
  res.render("login.ejs");
});


router.post('/login', async function(req,res,next){
  let body = req.body;

  if(!body.userid){
    res.status(500).send({
      message : "userid is null"
    });
    return;
  }

  let result = await models.Users.findOne({
    where:{
      id:body.userid
    }
  });

  let dbPassword = result.dataValues.password;
  let inputPassword = body.password;
  let salt = result.dataValues.salt;
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  if(dbPassword === hashPassword){
    // res.send({
    //   message : "Login success",
    //   status: 'success',
    //   data:{
    //     id:body.userid
    //   }
    // })
    res.send(`<script>alert('로그인 성공!');history.go(-1);</script>`);
    return;
  }
  else{
    res.status(500).send({
      message: 'Wrong Password'
    });
  }
})



module.exports = router;