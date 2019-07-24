import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Order from './Order/Order';
import OrderResume from './OrdersResume/OrdersResume';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">RESTO</h1>
        </header>
        {/* <Order></Order> */}
        <OrderResume ref="parentOrderResume"></OrderResume>
      </div>
    );
  }
}

export default App;
