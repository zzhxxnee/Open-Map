require('dotenv').config();
const req = require('express/lib/request');
const res = require('express/lib/response');
const db = require("../models/index.js")
const Sequelize = require('sequelize');
const models = require("../models");
const Company = db[models.Company];

exports.getAllPositions = async (req, res) => {
    try{
        data = Company.findAll();
        res.render("index", {positions: data, apikey : process.env.KAKAO_JS_KEY, title: "OpenMap"});
    }catch(err){
        res.status(500).send({
            message: err.message
        });
    }
};