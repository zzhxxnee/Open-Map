var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require("../controllers/user");

var router = express.Router();
/* GET users listing. */
router.get('/', User.getUsers);

router.get('/sign_up', User.getSignup);

router.post("/sign_up", User.postSignup);

router.post('/checkid', User.postCheckID);

router.get('/login', User.getLogin);

router.post('/login', User.postLogin);

router.get('/logout', User.getLogout);

router.get('/findID', User.getFindID);

router.get('/findIDResult', User.getFindIDResult);

router.post('/findIDResult', User.postFindIDResult);

router.get('/findPassword', User.getFindPassword);

router.get('/changePassword', User.getChangePassword);

router.post('/findPassword', User.postFindPassword);

router.post('/changePassword', User.postChangePassword);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] })); // 프로파일과 이메일 정보를 받는다.

router.get(
    '/google/callback',
    passport.authenticate('google'), 
    (req, res) => {
        req.session.user_id = req.session.passport.user;
        res.redirect('/');
    },
 );

router.get('chooseSignup', async(req, res, next)=>{
  res.render("changePassword")
});





module.exports = router;