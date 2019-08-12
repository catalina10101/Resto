import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Navigation from './Navigation';

//import Order from './Order/Order';

class App extends Component {
  render() {
    return (
      <div className="App">
        { <header className="App-header">
          {/*  <img src={logo} className="App-logo" alt="logo" />    */}
          <h1 className="App-title">RESTO</h1>       
          </header> 
       }
        
        
        

        <BrowserRouter> 
          <div>
             <Navigation />
          </div>
        </BrowserRouter>
        
      </div>
    );
  }
}

export default App;
