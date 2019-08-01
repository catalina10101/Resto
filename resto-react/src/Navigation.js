import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Order from './Order/Order';
import OrderResume from './OrdersResume/OrdersResume';
import DeliveredProducts from './Reports/DeliveredProducts';

class Navigation extends Component {

    render () {
        return (
            <div>
                <header>
                    <nav className="menu"> 
                        <ul>
                            <li><Link to="/"> HOME </Link> </li>
                            <li><Link to="/placeOrder"> Place an Order </Link></li>
                            <li><Link to="/orders"> Orders </Link></li>
                            <li><Link to="/reports"> Reports </Link></li>
                        </ul>
                    </nav>  
                </header>
                <Route path="/placeOrder" component={Order} />
	            <Route path="/orders" component={OrderResume} />
                <Route path="/reports" component={DeliveredProducts} />
            </div>
        );
    }
}

export default Navigation;