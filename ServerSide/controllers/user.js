const db = require('../models')
const { QueryTypes } = require('sequelize');

const FrontEndURL = "http://localhost:3000"

exports.Login = async function(req, res, next){
    //write Login db logic
    // const [results, metadata] = await db.sequelize.query("SELECT * From Teams;");
    console.log('request', req.query);
    res.redirect(FrontEndURL + '/');
}

exports.SignUp = async function(req, res, next){
    console.log('request', req.body);
    // const [results, metadata] = await db.sequelize.query("SELECT * From Teams;");
    return db.sequelize.query(
        "insert into Teams(TeamName) Values(?)",
        {
            replacements: ['active'],
            type: QueryTypes.INSERT
        }
	).then(result => {
		res.redirect(FrontEndURL + '/');
	})
}

