var mysql      = require('mysql');
const express = require("express");
var cors = require('cors')
var cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'efa_db'
});
connection.connect();

// reserve seat function
// b3mel el queries nested keda 3l4an a avoid el asynchronous 3l4an bya5od elly b3dy 2bl ma el query elly m3aya t5allas

// in post man
// {
// 	"seatNo":"2",
// 	"stadiumName":"Cairo",
// 	"creditCard":12345,
// 	"matchDate":"2021-01-15 21:54:35",
// 	"usr":"ahmed"
// }
app.post('/api/ReserveSeat', (req,res)=>{
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
    query="select seatNo from reservedseats where stadiumName='"+req.body.stadiumName+"' and matchDate='"+req.body.matchDate+"'";
    connection.query(query, async function (error, results, fields) {
        if (error) throw error;
        for(let i=0;i<results.length;++i){
            if(req.body.seatNo==results[i].seatNo){
                res.send("please insert another seat");
                return;
            }
        }
        let ticketNo;
        connection.query("select max(TicketNumber) from reservedseats", async function (error, results, fields) {
        if (error) throw error;
        ticketNo=results[0]['max(TicketNumber)']+1;
        DateNow= new Date().toISOString().slice(0, 10);
        console.log(ticketNo);
        query="insert into reservedseats values('"+req.body.stadiumName+"',"+ticketNo+","+req.body.seatNo+",'"+req.body.usr+"','"+DateNow+"','"+req.body.matchDate+"');";
        connection.query(query, function (error, results, fields) {
          if (error) {;
            res.send("input not found")
          }
          res.send("Done, ticket No = "+ticketNo)
    });
  });
    });
});

//postman
//{
//	"usr":"ahmed",
//	"ticketNo":1234568
//}
app.delete("/api/cancelReservation",(req,res)=>{
    if(!req.body.ticketNo){
        // bad request
        res.send("you must enter a ticket number")
        return;
    }
    query="select ReservationDate from reservedseats where TicketNumber='"+req.body.ticketNo+"' and ReservingUser ='"+req.body.usr+"'";
    console.log(query);
    connection.query(query,  function (error, results, fields) {
        if (error) throw error;
        if(results.length==0){
            res.send("this ticket isn't exist or didn't assigned to this user");
        }
        else{
            date=new Date()
            if(((((date-results[0].ReservationDate)/1000)/60)/60)/24 <= 3.0){
                query="delete from reservedseats where TicketNumber="+req.body.ticketNo+" and ReservingUser= '"+req.body.usr+"'";
                connection.query(query, function (error, results, fields) {
                    if (error) throw error;
                    res.send("done");
                });
            }
            else{
                res.send("time allowed for cancellation exceeded");
            }
        }
    });
});


app.post('/api/ReserveSeat/GetTimeDate', (req,res)=>{
   if(!req.body.stadiumName){
        // bad request
        res.send("please, choose the stadium")
        return;
    }
   query="select DateAndTime from matches where Venue='"+req.body.stadiumName+"'";
   connection.query(query, async function (error, results, fields) {
       if (error) throw error;
       sentData=[]
       for (var i=0;i<results.length;++i) {
        //console.log(key);
        sentData.push(results[i].DateAndTime);
      }
       res.send(sentData)
   });
});

app.listen(5000,()=>console.log('listening on port 5000..'));
 
// connection.end();


