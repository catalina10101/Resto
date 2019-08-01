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
        filteredOrders:[]
	}
    
    constructor(props) {
        super(props);
        console.log("OrderResume...");
        this.repo = new Repository();
        this.orderElems = [];
        this.SetOrders.bind(this);
        this.UpdateOrderState.bind(this);
        // this.SendOrder.bind(this);
    }
    
    componentDidMount = () => {
        console.log("ComponentDidMount");
        this.repo.GetOrders(this.SetOrders);
    }

    SetOrders = (data) => {
        this.setState({ orders: data, filteredOrders: data });
    }

    render() {
        return (
            <div className="container">
                <div><h2>ORDERS:</h2>  </div>
                <div> 
                    <input type="checkbox" id="chkOpen" onChange={this.FilterOrdersByState} /> <span>Open </span> 
                    <input type="checkbox" id="chkInProgress" onChange={this.FilterOrdersByState} /> <span>In Progress </span> 
                    <input type="checkbox" id="chkDelivered" onChange={this.FilterOrdersByState} /> <span>Delivered </span> 
                </div>
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
        return this.state.filteredOrders.map(order => {
            return <OrderSummary order={order} ref={this.orderElems['ordersum-' + order.OrderID]} key={'key_ordersum_' + order.OrderID} 
            onStateChanged={this.OrderStateChanged} GetStateDescription={this.GetStateDescription}></OrderSummary>
         });
    }

    FilterOrdersByState = () => {
        let newOrders = [...this.state.orders];
        let showStates = [];
        if(document.getElementById('chkOpen').checked)
            showStates.push(1);
        if(document.getElementById('chkInProgress').checked)
            showStates.push(2);
        if(document.getElementById('chkDelivered').checked)
            showStates.push(3);
        newOrders = newOrders.filter(x=> showStates.includes( x.StateID));
        this.setState({filteredOrders: newOrders});
    }

    OrderStateChanged = (orderId, setNext) => {
        this.repo.ChangeState(orderId, setNext, this.UpdateOrderState.bind(this));
    }

    UpdateOrderState = (orderId, newState) => {
        const newOrders = [...this.state.orders];
        const orderIdx = this.state.orders.findIndex(x=> x.OrderID == orderId);
        newOrders[orderIdx].StateID = newState;
        this.setState({orders: newOrders }, this.FilterOrdersByState);
    }

    GetStateDescription = (stateID) => {
        switch(stateID){
            case 1: return "Open"; break;
            case 2: return "In Progress"; break;
            case 3: return "Delivered"; break;
            default: return "undefined"; 
        }
    }
}

export default Radium(OrderResume);