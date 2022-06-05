var express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const mapInit = require("../controllers/map/mapInit");
const mapController = require("../controllers/map/mapController");
const menuLoader = require("../controllers/map/menuLoader");
const myPlaceController = require("../controllers/map/myPlaceController");
var router = express.Router();

/* GET home page. */
router.get('/', mapInit.Initialize);
router.post('/menu-ajax', menuLoader.getMenu);
router.post('/myplace-ajax', myPlaceController.setMyPlace);
router.post('/setbound-ajax', mapController.getAllPositions);

module.exports = router; 



