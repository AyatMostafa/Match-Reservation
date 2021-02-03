import React from 'react';
import Home from './components/HomeComponent.js';
import Customer from './components/CustomerComponent.js';
import ReserveSeat from './components/reserveSeat';
import CancelReservation from './components/CancelReservation';
import Matches from './components/MatchComponent.js';
import Square from './components/Square';
import EditMatch from './components/EditMatch.js';
import UserList from './components/UserList';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Square from './components/Square'
import Stadium from './components/AddStadium'

const MatchWithId = ({match}) => 
{
    return(
        <EditMatch matchID={match.params.matchId} />
    );
}

function App() {
  return (

    <BrowserRouter>
      <Switch>
        <Route path='/matches/:matchId'  render={({ location,  match }) => (
        <MatchWithId key={location.key} match={match} />
        )} />

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