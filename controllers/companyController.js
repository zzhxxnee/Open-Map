require('dotenv').config();
const db = require("../models/index")
const Company = db.company;

exports.chooseCompType = async (req, res) => {
    res.render("compRegistType");
};