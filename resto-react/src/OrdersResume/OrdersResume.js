import React, { Component } from 'react';
import OrderSummary from './OrderSummary';
import Radium from 'radium';
import Repository from '../Repository/Repository';

class OrderResume extends Component {
	state = {
		orders: [
            // {
            //     "OrderProducts": [
            //         {
            //             "OrderProductsID": 1,
            //             "ProductId": 3,
            //             "product": {
            //                 "ProductID": 3,
            //                 "ProductName": "pizza",
            //                 "Price": 5.00
            //             },
            //             "Quantity": 2
            //         }
            //     ],
            //     "OrderID": 1,
            //     "State": "open",
            //     "Date": "2019-06-12T00:00:00"
            // }
        ],
	}
    
    constructor(props) {
        super(props);
        this.repo = new Repository();
        this.orderElems = [];
        this.SetOrders.bind(this);
        // this.SendOrder.bind(this);
    }
    
    componentDidMount = () => {
        console.log("ComponentDidMount");
        this.repo.GetOrders(this.SetOrders);
    }

    SetOrders = (data) => {
        this.setState({ orders: data });
    }

    render() {
        return (
            <div className="container">
                <div><h2>ORDERS:</h2>  </div>

                <div style={{ textAlign: 'center' }}>
                    <div style={{display: 'inline-block', width: '80%'}}>
                        { 
                        this.renderOrderSummary()
                        }
                    </div>
                </div>
            </div>
        );
    }

    renderOrderSummary = () => {
        return this.state.orders.map(order => {
            return <OrderSummary order={order} ref={this.orderElems['ordersum-' + order.OrderID]} key={'key_ordersum_' + order.OrderID}  ></OrderSummary>
         });
    }

}

export default Radium(OrderResume);