
const db = require('../models')
const { QueryTypes } = require('sequelize');


exports.ReserveSeat= async function(req,res){
    console.log(req);
     if(!req.body.seatNo){
         // bad request
         res.send("you must enter a seat number")
         return;
     }
     if(!req.body.stadiumName){
        // bad request
        res.send("you must enter the stadium name")
        return;
    }
     if(!req.body.creditCard){
        // bad request
        res.send("you must enter a credit card number")
        return;
    }
    if(! req.body.matchDate){
        // bad request
        res.send("you must enter the match date")
        return;
    }

    let results = await db.sequelize.query(
        "select seatNo from reservedseats where stadiumName=? and matchDate=?",
        {
            replacements: [req.body.stadiumName,req.body.matchDate]   ,
            type: QueryTypes.SELECT                
        }
    );
    if(typeof results !== 'undefined' && results)   // exists
    {
        for(let i=0;i<results.length;++i){
            if(req.body.seatNo==results[i].seatNo){
                res.send("please insert another seat. Unfortunately,this seat is taken");
                return;
            }
        }
    }
        let ticketNo;
        results = await db.sequelize.query(
            "select max(TicketNumber) from reservedseats",
            {
                type: QueryTypes.SELECT                
            }
        );
        if(typeof results !== 'undefined' && results)   // exists
        {
            ticketNo=results[0]['max(TicketNumber)']+1;
            DateNow= new Date().toISOString().slice(0, 10);
            console.log(ticketNo);
            results = await db.sequelize.query(
                "insert into reservedseats values(?,?,?,?,?,?);",
                {
                    replacements: [req.body.stadiumName,ticketNo,req.body.seatNo,req.body.usr,DateNow,req.body.matchDate],
                    type: QueryTypes.INSERT                
                }
            );
            if(typeof results !== 'undefined' && results)   // exists
            {
                res.send("Done, ticket No = "+ticketNo)   
            }
            else{
                res.send("input not found")
            }
        }
};



exports.cancelReservation= async function(req,res){
    if(!req.body.ticketNo){
        // bad request
        res.send("you must enter a ticket number")
        return;
    }

   let results = await db.sequelize.query(
       "select ReservationDate from reservedseats where TicketNumber=? and ReservingUser =?",
       {
           replacements: [req.body.ticketNo,req.body.usr]   ,
           type: QueryTypes.SELECT                
       }
   );
   if(typeof results !== 'undefined' && results)   // exists
   {
        if(results.length==0){
            res.send("this ticket doesn't exist or isn't assigned to you");
        }
        else{
            date=new Date()
            let then=results[0].ReservationDate
            if(((((date-new Date(results[0].ReservationDate))/1000)/60)/60)/24 <= 3.0){
                results = await db.sequelize.query(
                    "delete from reservedseats where TicketNumber=? and ReservingUser= ?",
                    {
                        replacements: [req.body.ticketNo,req.body.usr]   ,
                        type: QueryTypes.DELETE                
                    }
                );
                res.send('done, your money is transacted to your account');
            }
            else{
                res.send("time allowed for cancelation is exceeded");
            }
        }
   }
};



exports.GetTimeDate=async function(req, res){
    console.log(req);
   if(!req.query.stadiumName){
        // bad request
        res.send("please, choose the stadium")
        return;
    }


    const results = await db.sequelize.query(
        "select DateAndTime from matches where Venue= ?",
        {
            replacements: [req.query.stadiumName],
            type: QueryTypes.SELECT
        });

    if(typeof results !== 'undefined' && results)   // exists
    {
        sentData=[]
        for (var i=0;i<results.length;++i) {
             sentData.push(results[i].DateAndTime);
        }
        res.send(sentData)
    }else{
        res.send('no')
    }
};