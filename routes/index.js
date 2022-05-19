var express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const mapController = require("../controllers/mapController");
const { response } = require('../app');
var router = express.Router();

/* GET home page. */
router.get('/', mapController.getAllPositions);

module.exports = router; 



