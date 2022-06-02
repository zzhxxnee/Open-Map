var express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { response } = require('../app');
const models = require('./../models');
const crypto = require('crypto');
let session = require('express-session');
const db = require('./../models');
const nodemailer = require('nodemailer');
const { resourceLimits } = require('worker_threads');


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/myPage', (req, res, next)=>{
  res.send("my page");
})

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
  let session = req.session;

    res.render("login.ejs", {
      session : session
  });
});


router.post('/login', async function(req,res,next){
  let body = req.body;

  let result = await models.Users.findOne({
    where:{
      id:body.userid
    }
  });

  if(!body.userid){
    res.status(500).send({
      message : "id is null"
    });
    return;
  }

  let dbPassword = result.dataValues.password;
  let inputPassword = body.password;
  let salt = result.dataValues.salt;
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  if(dbPassword === hashPassword){
    console.log('비밀번호 일치');
    req.session.user_id = body.userid;
    res.redirect('/users/login');

  }
  else{
    res.status(500).send({
      message: 'Wrong Password'
    });
  }
})

router.get('/logout', (req, res, next)=>{
  req.session.destroy();
  res.clearCookie('sid');

  res.redirect('/users/login');
})


// router.get('/findPassword', async(req, res, next)=>{
//   res.render('findPassword.ejs');
// });

// router.post('/findPassword', async (req, res, next) => {
//   const { email } = req.body;
//   try {
//     const user = await models.Users.findOne({ // 1. 유저가 존재하면 유저 정보를 가져옴
//       where: { email: email },
//     });
//     if (user) { // 2. 유저가 있다면?
//       const token = crypto.randomBytes(20).toString('hex'); // 3. token 생성(인증코드)
//       const data = {
//         // 4. 인증코드 테이블에 넣을 데이터 정리
//         token,
//         userid: user.id,
//         ttl: 300, // ttl 값 설정 (5분)
//       };
      
//       models.EmailAuth.create(data); // 5. 인증 코드 테이블에 데이터 입력

//       const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         port: 465,
//         secure: true, // true for 465, false for other ports
//         auth: {
//           // 이메일을 보낼 계정 데이터 입력
//           user: process.env.GOOGLE_ID,
//           pass: 'process.env.GOOGLE_PASSWORD',
//           // .env에 따로 관리해야함
//         },
//       });

//       const mailOptions = {
//         from: 'process.env.GOOGLE_ID', // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
//         to: req.body.email, // 수신 메일 주소
//         subject: 'Password search authentication code transmission', // 제목
//         text: 'This is the authentication code to find the password!', // 내용
//         html:
//           `<p>비밀번호 초기화를 위해서는 아래의 URL을 클릭하여 주세요.<p>` +
//           `<a href='http://localhost:3000/users/${token}'>비밀번호 새로 입력하기</a>`,
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.log(error);
//         } else {
//           console.log('Email sent: ' + info.response);
//         }
//       });
//       return res.json(result);
//     } else {
//       return res.status(403).send('This account does not exist');
//     }
//   } catch (e) {
//     // try에서 result 결과값이 null일때 catch에서 에러로 잡지 않음 이유는?..
//     res.send(e);
//   }
// });

// router.get('/findID', (req, res, next) =>{
//   res.render('findID.ejs');
// })

// router.get('/users/findIDResult', (req, res, next) =>{
//   res.render('findIDResult.ejs');
// })


// router.post('/users/findIDResult', (req, res, next) => {
//   var uemail = req.body.email;
//   var uid = req.body.userid;
//   models.Users.findOne( {where : {"email": uemail}}, (err, user) => {
//       if (err) return res.json(err);
//       if (user) {
//         res.render('findIDResult', {
//           FindID : uemail
//         });
//       } else {
//           console.log('can not find ID');
//           res.send(`
//               <a href="/">Back</a>
//               <h1>can not find id</h1>
//           `);
//       }
//   })
// })

module.exports = router;
