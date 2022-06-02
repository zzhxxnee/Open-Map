var express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const mapController = require("../controllers/mapController");
const menuLoader = require("../controllers/menuLoader");
const myPlaceController = require("../controllers/myPlaceController");
const { response } = require('../app');
var router = express.Router();

/* GET home page. */
router.get('/', mapController.getAllPositions);
router.post('/menu-ajax', menuLoader.getMenu);
router.post('/myplace-ajax', myPlaceController.setMyPlace);

module.exports = router; 



