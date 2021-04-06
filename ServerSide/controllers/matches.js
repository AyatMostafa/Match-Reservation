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
    console.log(Data.MatchTime, typeof(Data.MatchTime))
    console.log(Data.MatchTime.substring(0,2));
    console.log(Data.MatchTime.substring(3,5));
    // console.log(Number.parseInt(Data.MatchTime.substring(0,2)));
    // console.log(Number.parseInt(Data.MatchTime.substring(3,5)));
    try {
        return db.sequelize.query(
            "Insert into matches (HomeTeam, AwayTeam, Venue, MatchDate, MatchHour, MatchMin, MainReferee, LineMan1, LineMan2) Values(?, ?, ?, ?, ?, ?, ?, ?, ?)",
                {
                    replacements: [
                        Data.HomeTeam,
                        Data.AwayTeam,
                        Data.Venue, 
                        new Date(Data.MatchDate),
                        Number.parseInt(Data.MatchTime.substring(0,2)),
                        Number.parseInt(Data.MatchTime.substring(3,5)),
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
        "Update matches Set Venue = ?, MatchDate = ?, MatchHour= ? , MatchMin = ?,  MainReferee = ?, LineMan1= ?, LineMan2 = ? where Venue = ? and MatchDate = ? and MatchHour= ? and MatchMin = ?",
        {
            replacements: [Data.Venue, Data.Date, Number.parseInt(Data.Time.substring(0,2)).toString(), Number.parseInt(Data.Time.substring(3,5)).toString(), 
                Data.MainReferee, Data.LineMan1, Data.LineMan2, Data.idVenue, 
                Data.idDate, Number.parseInt(Data.idTime.substring(0,2)).toString(), 
                Number.parseInt(Data.idTime.substring(3,5)).toString()],
            type: QueryTypes.UPDATE
        }
    );
    if(metadata)
        res.send("Success");
    else 
        res.send("Failed");
}

exports.CheckEdit = async function(req, res){
    const Data = req.body;
    console.log(Data.Date, typeof(Data.Date));
    const [results, metadata] = await db.sequelize.query(
        "select * from matches where MatchDate = '" + Data.Date.substring(0,10) + "'  and (Venue = '" + Data.Venue + "' or MainReferee = '" + Data.Referee +"' or LineMan1 = '"+ Data.Lineman1+ "' or LineMan2 = '"+ Data.Lineman2 + "' or LineMan1 = '"+ Data.Lineman2+ "' or LineMan2 = '"+ Data.Lineman1 + "');" 
    );
    console.log(results);
    res.send(results);  
}

exports.CheckCreate = async function(req, res){
    const Data = req.body;
    console.log(Data.Date, typeof(Data.Date));
    const [results, metadata] = await db.sequelize.query(
        "select * from matches where MatchDate = '" + Data.Date.substring(0,10) + "'  and (Venue = '" + Data.Venue + "' or MainReferee = '" + Data.Referee +"' or LineMan1 = '"+ Data.Lineman1+ "' or LineMan2 = '"+ Data.Lineman2 + "' or LineMan1 = '"+ Data.Lineman2+ "' or LineMan2 = '"+ Data.Lineman1 + "' or HomeTeam = '"+ Data.HomeTeam+ "' or AwayTeam = '"+ Data.AwayTeam + "' or HomeTeam = '"+ Data.AwayTeam + "' or AwayTeam = '"+ Data.HomeTeam + "');" 
    );
    console.log(results);
    res.send(results);  
}

// const [results, metadata] = await db.sequelize.query(
//     "select * from matches where MatchDate = '" + Data.Date.substring(0,10) + "' and MatchHour = " + Number.parseInt(Data.Time.substring(0,2)).toString() + " and MatchMin = " + Number.parseInt(Data.Time.substring(3,5)).toString() + " and (Venue = '" + Data.Ven + "' or MainReferee = '" + Data.Referee +"' or LineMan1 = '"+ Data.Lineman1+ "' or LineMan2 = '"+Data.Lineman2 + "');" 
// );