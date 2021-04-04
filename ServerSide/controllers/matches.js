const db = require('../models')
const { QueryTypes } = require('sequelize');

const FrontEndURL = "http://localhost:3000"

exports.showMatches = async function(req, res){
    const [results, metadata] = await db.sequelize.query(
        "Select * from matches"
    );
    res.send(results);
}

exports.CreateMatch = async function(req, res){
    const Data = req.body;
    try {
        return db.sequelize.query(
            "Insert into matches (HomeTeam, AwayTeam, Venue, DateAndTime, MainReferee, LineMan1, LineMan2) Values(?, ?, ?, ?, ?, ?, ?)",
                {
                    replacements: [
                        Data.HomeTeam,
                        Data.AwayTeam,
                        Data.Venue, 
                        new Date(Data.DateAndTime),
                        Data.MainReferee, 
                        Data.LineMan1, 
                        Data.LineMan2
                        ],
                    type: QueryTypes.INSERT
                }
        ).then(result => {
            res.send("Success");
        });
    }catch(error){
        console.log("failed to insert");
        // res.status(500).send("Failed");
    }
}

exports.EditMatch = async function(req, res){
    // req.setTimeout(0);
    const Data = req.body;
    const [results, metadata] = await db.sequelize.query(
        "Update matches Set Venue = ?, DateAndTime = ? , MainReferee = ? , LineMan1= ?, LineMan2 = ? where Venue = ? and DateAndime = ?",
        {
            replacements: [Data.Venue, Data.DateAndTime, Data.MainReferee, Data.LineMan1, Data.LineMan2, Data.idVenue, Data.idDate],
            type: QueryTypes.UPDATE
        }
    );
    if(metadata)
        res.send("Success");
    else 
        res.send("Failed");
}