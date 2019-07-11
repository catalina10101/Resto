import React from 'react';
//export 

const orderProduct = (props) => {
    return (       
        <tr>
            <td>{props.prodInfo.ProductID}</td>
            <td>{props.prodInfo.ProductName}</td>
            <td>${props.prodInfo.Price}</td>
            <td><input type="text" onBlur={props.ProdQuantityChanged} data-product-id={props.prodInfo.ProductID} ></input></td>
        </tr>
    );
}

export default orderProduct;