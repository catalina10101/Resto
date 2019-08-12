import React, { Component } from 'react';
import Repository from '../Repository/Repository';

class DeliveredProducts extends Component {
    state = {
        delProds:[],
        columnTitles: ['Product', 'Quantity', 'Unit Price', 'Total'],
        columns: ['ProductName', 'Quantity', 'UnitPrice', 'Total']
    }

    constructor(props) {
        super(props);
        console.log("DeliveredProducts...");
        this.repo = new Repository();
        
        this.SetDeliveredProds.bind(this);
        // this.UpdateOrderState.bind(this);
        // this.SendOrder.bind(this);
    }
    
    componentDidMount = () => {
        this.repo.GetProductsOrderedReport(this.SetDeliveredProds);
    }

    SetDeliveredProds = (data) => {
        this.setState({delProds: data});
    }

    render = () => {
        return (
            <div className="container">
                <div><h2> ORDERED PRODUCTS:</h2>  </div>
                <div>
                    <table className="center">
                        <tbody>
                            <tr>
                                {
                                    this.state.columnTitles.map((col,c) => {
                                        return <th key={"col_"+c}> { col } </th>
                                    })
                                }
                            </tr>
                        {   
                            this.state.delProds.map((prod,i)=> {
                                return <tr key={"prod_" + i.toString()}>
                                {
                                    this.state.columns.map((col,c) => {
                                        return <td key={"col_"+c}> { prod[col] } </td>
                                    })
                                }
                                </tr>  
                            }
                            )
                        }
                        </tbody>
                    </table>

                    <div>
                        <label> Total Income: $</label> <span> { this.state.delProds.reduce( (total, prod) => {return total + prod.Total } ,0) } </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeliveredProducts;