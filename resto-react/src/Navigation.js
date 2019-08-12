import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import Order from './Order/Order';
import OrderResume from './OrdersResume/OrdersResume';
import DeliveredProducts from './Reports/DeliveredProducts';
import restoImg from './resources/images/resto1.jpg';

class Navigation extends Component {

    render () {
        return (
            <div>
                <header>
                    <nav > 
                        <ul className="menu">
                            <li><NavLink to="/" exact> HOME </NavLink> </li>
                            <li><NavLink to="/placeOrder"> Place an Order </NavLink></li>
                            <li><a href="">Reports</a>
                                    <ul class="submenu">
                                        <li><NavLink to="/orders"> Orders </NavLink></li>
                                        <li><NavLink to="/delivered-prods"> Ordered Prods </NavLink></li>
                                    </ul>
                            </li>
                        </ul>
                    </nav>  
                </header>
                <Route path="/" render={ ()=> <div> <img src={restoImg} width="300" ></img> </div>} />
                <Route path="/placeOrder" component={Order} />
	            <Route path="/orders" component={OrderResume} />
                <Route path="/delivered-prods" component={DeliveredProducts} />
            </div>
        );
    }
}

export default Navigation;