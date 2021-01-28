import React from 'react';
import Home from './components/HomeComponent.js';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
          <div className="App">
            <Home />
          </div>
    </BrowserRouter>
  );
}

export default App;