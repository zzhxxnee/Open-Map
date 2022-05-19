require('dotenv').config();
const db = require("../models/index")
const Company = db.company;

exports.getAllPositions = async (req, res) => {
    try{
        data = await Company.findAll();
        res.render("index", {positions: data, apikey : process.env.KAKAO_JS_KEY, title: "OpenMap"});
    }catch(err){
        res.status(500).send({
            message: err.message
        });
    }
};