var express = require('express');
var router = express.Router();

let user = require('../controllers/user');
let customer = require('../controllers/customer');
let customerReservation = require('../controllers/customerReservation');
let matches = require('../controllers/matches');

router.post('/Login', user.Login)
router.post('/SignUp', user.SignUp)
router.get('/nonAdminUsers', user.fetchNonAdminUsers);
router.put('/users/ApproveUser/:username', user.ApproveUser);
router.delete('/users/DeleteUser/:username', user.DeleteUser);
router.get('/CustomerInfo', customer.fetchCustomerData);
router.post('/EditInfo', customer.EditInfo);
router.post('/AddStadium',customer.AddStadium);
router.get('/FetchStadium',customer.FetchStadium);
router.get('/ReservedSeats',customer.FetchReservedSeats);
router.get('/GetTimeDate',customerReservation.GetTimeDate);
router.post('/ReserveSeat',customerReservation.ReserveSeat);
router.delete('/cancelReservation',customerReservation.cancelReservation);
router.post('/matches/CreateMatch', matches.CreateMatch);
router.post('/matches', matches.showMatches );
router.post( '/EditMatch', matches.EditMatch);

module.exports = router;
