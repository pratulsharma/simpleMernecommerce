import React, { Component } from 'react';
import axios from "axios";
import Toast from 'light-toast';
import CartList from './CartList';


class ProductItem extends Component {
    // state = {
    //     cart: [],
    //     numberOfItems: 0
    // }
    deleteItem = (id) => {
        console.log("id", this.props.product._id)
        axios.delete("/delete/" + this.props.product._id);
        // window.location.reload();
    }
    increment = (ev) => {
        this.props.callBackFromParent(this.props.product)
    }
    editItem = (id) => {
        console.log("id", this.props.product._id);
        axios.post("/update/" + this.props.product._id);
 
   }
    render() {

        return (
            <div>
               <table className="table-sm" style={{ marginTop: 20 }}>
    <tr>
        <td style={{width: 190}}>{this.props.product.description}</td>
        <td style={{width: 90}}>{this.props.product.pages}</td>
        <td style={{width: 190}}>{this.props.product.writer}</td>
         <td>
             <button onClick={this.editItem}> edit </button>
        </td> 
        <td>
                            <button onClick={this.deleteItem}> Delete </button> 
            {/* <Link to={"/edit/"+props.todo._id}>Edit</Link> */}
        </td>
         <td>
             <button  onClick={this.increment}> Buy </button>
                        </td> 

    </tr>
    </table> 
            </div>
        )
    }
};

export default ProductItem; 