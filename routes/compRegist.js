const express = require('express');
const { router } = require('../app');
const models = require('./../models');
const companyController = require("../controllers/companyController");

router.get("/", comapnyController.chooseCompType);


module.exports = router; 

