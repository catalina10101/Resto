import React from 'react';
import './OrderResume.css'; 
//export 

const OrderSummary = (props) => {
    return (     
        <div className={'orderSummary orderBlock'}>
            <div className={'summaryCont'}>
                <label>Order Id: </label>
                <label> {props.order.OrderID} </label>
            </div>
            <div className={'summaryCont'}>
                <label>Total: $ </label>
                <label> {props.order.OrderProducts.reduce( (total, orderprod) => {return total + (orderprod.Quantity * orderprod.product.Price)} ,0) } </label>
            </div>
            <div className={'summaryCont'}>
                { 
                    props.order.OrderProducts.map( (prod,i) => {
                        if(prod.Quantity === 0 || prod.Quantity === undefined || prod.Quantity===null) 
                            return null;
                        else 
                            return <div key={'prod-'+i}> {prod.Quantity + " " + prod.product.ProductName } </div> 
                    })
                }
            </div>
            <div className={'summaryCont'}>
                <div>Order State: </div>
                <div className={'changeState'}> <button> {'<'} </button> {props.order.State}  <button> {'>'} </button>  </div>
            </div>
        </div>  
    );
}

export default OrderSummary;