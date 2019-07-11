import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Order from './Order/Order';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">RESTO</h1>
        </header>
        <Order></Order>
      </div>
    );
  }
}

export default App;
