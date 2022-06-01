const db = require("../models/index");
const MyPlace = db.myPlace;

exports.setMyPlace = async (req, res) => {
    try{
        if(req.body.type == 'set'){
            await MyPlace.create({
                CompanyCompId : req.body.compId,
                UserId : req.session.user_id
            });
        }else{
            await MyPlace.destroy({
                where:{
                    compId : req.body.compId
                }
            });
        }

        res.json('ok');

    }catch(err){
        res.status(500).send({
            message: err.message
        });
    }
};