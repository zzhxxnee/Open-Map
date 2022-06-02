const db = require("../models/index");
const Menu = db.menu;

exports.getMenu = async (req, res) => {
    try{
        var responseData = await Menu.findAll({
            attributes: ['id', 'price', 'menuName'],
            where:{
                compId : req.body.id
            }
        });
        res.json(responseData);

    }catch(err){
        res.status(500).send({
            message: err.message
        });
    }
};