import React, { Component } from 'react';
import OrderProduct from './OrderProduct';
import Radium from 'radium';

class Order extends Component {
	state = {
		order: [
            {ProductID:1, ProductName:"Pizza", Price: 5, Quantity:0 },
            {ProductID:2, ProductName:"Burguer", Price: 7, Quantity:0 },
        ],
	}
    
    constructor(props) {
        super(props);
        this.orderProducts = [];
    }
    
	render() {
		return (
            <div className="container">
                <div><h2>Please select your order:</h2>  </div>
                <table className="center">
                    <tbody>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                        {this.ReturnMenuProducts()}
                        <tr>
                            <td></td>
                            <td></td>
                            <td>Total</td>
                            <td>{this.CalculateTotal()}</td>
                        </tr>
                    </tbody>            
                </table>
                <div>
                    <button class="buttonv1">SEND ORDER</button>
                </div>
            </div>
		);
    }
    
    ReturnMenuProducts(){
        return this.state.order.map(productInfo => {
            return <OrderProduct ref={this.orderProducts['prod_'+ productInfo.ProductID]} key={'keyprod_'+productInfo.ProductID} prodInfo={productInfo} ProdQuantityChanged={this.ProductQuantityChanged.bind(this)} />
        });
    }

    CalculateTotal(){
        let sum = 0;
        this.state.order.forEach(orderProd=> {           
            sum+=  orderProd.Price *  orderProd.Quantity;
        });
        return sum;
    }

    ProductQuantityChanged = (event) => {
        const prodId = parseInt(event.target.getAttribute('data-product-id'),10);
        const quantity = event.target.value==""? 0: parseInt(event.target.value,10);
        let newOrder = [...(this.state.order)];
        const currentProdOrder = newOrder.find(x=> x.ProductID === prodId);
        //console.log( currentProdOrder);//prodId, quantity,
        if(currentProdOrder != undefined)
            currentProdOrder.Quantity = quantity;
        else 
            newOrder.push({"ProductId": prodId, "Quantity" : quantity});
        //console.log(newOrder);
        this.setState({order: newOrder});
    }
}

export default Radium(Order);