const db = require('../models')
const { QueryTypes } = require('sequelize');

const FrontEndURL = "http://localhost:3000"

exports.Login = async function(req, res){
    const Data = req.body;
    const [results, metadata] = await db.sequelize.query(
        "Select UserName,Pass From users Where UserName = ?",
        {
            replacements: [Data.username],
            type: QueryTypes.SELECT
        });
    console.log(results);
    if(typeof results !== 'undefined' && results)   //username existed
    {
        console.log(results.Pass, Data.password);
        if(results.Pass === Data.password)
        {
            res.send("Success");
            return;
        }
        res.send("Incorrect Password");
        return;
    }
    res.send("User Name doesn't exist");
}


exports.SignUp = async function(req, res){

    const Data = req.body;
    const [results, metadata] = await db.sequelize.query(
            "Select UserName From users Where UserName = ?",
            {
                replacements: [Data.username],
                type: QueryTypes.SELECT
            });
    if(typeof results !== 'undefined' && results)   //username existed
    {
        res.send("Error");
        return;
    }
    return db.sequelize.query(
        "insert into users(UserName, Pass, FName, LName, BirthDate, Gender, City, UserAddress, Email, UserRole, Approved) \
        Values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        {
            replacements: [Data.username,
                           Data.password,
                           Data.Fname, 
                           Data.Lname, 
                           new Date(Data.BirthDate),
                           Data.Gender, 
                           Data.City, 
                           Data.Address, 
                           Data.Email, 
                           Data.Role, 
                           'N'],
            type: QueryTypes.INSERT
        }
	).then(result => {
        res.send("Success");
    });
}