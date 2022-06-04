var express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { response } = require('../app');
var router = express.Router();
const models = require('./../models');
const crypto = require('crypto');
let session = require('express-session');
const db = require('./../models');
const nodemailer = require('nodemailer');
const { resourceLimits } = require('worker_threads');
const User = require("../controllers/user");


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


module.exports = router;