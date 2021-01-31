import React from 'react';
import Home from './components/HomeComponent.js';
import Customer from './components/CustomerComponent.js'
import ReserveSeat from './components/reserveSeat'
import CancelReservation from './components/CancelReservation'
import { BrowserRouter, Route,Switch } from 'react-router-dom';
import './App.css';
import Square from './components/Square'


function App() {
  return (

    <BrowserRouter>
         {/*  <div className="App">
            <Home /> 
          </div> */}
          <Switch>
          <Route path="/profile">
            <Customer />
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




// function App() {
//   return (
//     <MainStage
//       onSelectSeat={seatId => {
//         console.log("selected - " + seatId);
//       }}
//     />
//   );
// }

// export default App;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
