const db = require('../models')
const { QueryTypes } = require('sequelize');

const FrontEndURL = "http://localhost:3000"

exports.fetchCustomerData = async function(req, res){
    const [results, metadata] = await db.sequelize.query(
        'Select * from users where UserName = ?',
        {
            replacements: [req.query.username],
            type: QueryTypes.SELECT
        }     
        );
    
    res.send(results);
}


exports.EditInfo = async function(req, res){
    console.log("fucking",req.body.params);
    const [results, metadata] = await db.sequelize.query(
        "Update users Set FName=?,LName=?,Gender=?,City=?,UserAddress=?,UserRole=?,Pass=? where UserName = ?",
        {
            replacements: 
            [
                req.body.params.FName,
                req.body.params.LName,
                req.body.params.Gender,
                req.body.params.City,
                req.body.params.Address,
                req.body.params.Role,
                req.body.params.password,
                req.body.params.username

            ],
            type: QueryTypes.UPDATE
        }
        );
    if(metadata)
        res.send("Success");
    else 
        res.send("Failed");
}


exports.AddStadium = async function(req, res){

    const Data = req.body;
    console.log(req.body);
    const [results, metadata] = await db.sequelize.query(
        "select StadiumName from stadiums where StadiumName=?",
        {
            replacements: [
                Data.params.StadiumName,
                
                           ],
            type: QueryTypes.SELECT
        }
    );
    if(typeof results !== 'undefined' && results) //already exist
    {
        res.send("Error");
        return;
    }
    
    return db.sequelize.query(
        "insert into stadiums(StadiumName, Place, NumberOfRows, NumberOfColumns) Values(?, ?, ?, ?)",
        {
            replacements: [
                Data.params.StadiumName,
                Data.params.Place,
                Data.params.NumberOfRows,
                Data.params.NumberOfColumns
                           ],
            type: QueryTypes.INSERT
        }
	).then(result => {
        res.send("Success");
    });
}
