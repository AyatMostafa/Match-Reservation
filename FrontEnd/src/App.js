import React from 'react';
import Home from './components/HomeComponent.js';
import Customer from './components/CustomerComponent.js'
import { BrowserRouter, Route,Switch } from 'react-router-dom';
import './App.css';

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
        
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </BrowserRouter>
      
  );
}

export default App;