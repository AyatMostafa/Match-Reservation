import React from 'react';
import Home from './components/HomeComponent.js';
import Customer from './components/CustomerComponent.js';
import ReserveSeat from './components/reserveSeat';
import CancelReservation from './components/CancelReservation';
import Matches from './components/MatchComponent.js';
import CreateMatch from './components/CreateMatch.js';
import Square from './components/Square';
import UserList from './components/UserList';
import Stadium from './components/AddStadium';
import MatchSeats from './components/MatchSeats'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';


// const MatchWithId = ({match}) => 
// {
//     return(
//         <EditMatch matchID={match.params.matchId} />
//     );
// }
const StadiumName = ({match}) => 
{
    return(
        <MatchSeats StadiumName={match.params.matchVenue} MatchDate={match.params.DateAndTime}/>
    );
}
function App() {
  return (

    <BrowserRouter>
      <Switch>
        {/* <Route path='/matches/:matchId'  render={({ location,  match }) => (
        <MatchWithId key={location.key} match={match} />
        )} /> */}

        <Route path="/matches/createMatch">
          <CreateMatch />
        </Route>

        <Route path='/stadium/:matchVenue/:DateAndTime'  render={({ location,  match }) => (
        <StadiumName key={location.key} match={match} />
        )} />
        <Route path="/seats">
          <MatchSeats />
        </Route>

        <Route path="/matches">
          <Matches />
        </Route>

        <Route path="/profile">
          <Customer />
        </Route>
       
        <Route path="/profile/admin/users">
          <UserList />
        </Route>

        <Route path="/addStadium">
          <Stadium/>
        </Route>
      
        <Route path="/showSeats">
          <Square />
        </Route>

        <Route path="/reserve">
          <ReserveSeat />
        </Route>

        <Route path="/cancel">
          <CancelReservation />
        </Route>

        <Route path="/">
          <Home />
        </Route>

      </Switch>
    </BrowserRouter>
      
  );
}

export default App;