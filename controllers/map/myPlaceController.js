const db = require("../../models/index");
const { QueryTypes } = require('sequelize');
const MyPlace = db.myPlace;
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

exports.setMyPlace = async (req, res) => {
    try{
        const isMyPlace = await sequelize.query(`SELECT * FROM myplace WHERE CompanyCompId = ${req.body.compId};`, { type: QueryTypes.SELECT });
        if(isMyPlace.length == 0){
            const [results, metadata] = await sequelize.query(`INSERT INTO myplace (UserId, CompanyCompId) VALUES ('${req.session.user_id}',${req.body.compId});`);
        }else{
            const [results, metadata] = await sequelize.query(`DELETE FROM myplace WHERE CompanyCompId = ${req.body.compId};`);
        }

        res.json('ok');

    }catch(err){
        res.status(500).send({
            message: err.message
        });
    }
};