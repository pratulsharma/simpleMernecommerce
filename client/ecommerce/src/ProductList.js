import React, { Component } from 'react';
import axios from "axios";
import { BrowserRouter as Router, Route, Link , routeProps, render } from "react-router-dom";
import ProductItem from './ProductItem';
import CartList from './CartList';
// const ProductElement = props => (
//     <table className="table-sm" style={{ marginTop: 20 }}>
//     <tr>
//         <td style={{width: 190}}>{props.product.description}</td>
//         <td style={{width: 90}}>{props.product.pages}</td>
//         <td style={{width: 190}}>{props.product.writer}</td>
//          <td>
//              <button > edit </button>
//         </td> 
//         <td>
//              <button onClick={deleteItem(props.product._id)}> Delete </button>
//             {/* <Link to={"/edit/"+props.todo._id}>Edit</Link> */}
//         </td>
//     </tr>
//     </table>
// )
 class Product_Data extends Component {
     constructor(props) {
         super(props);
         this.state = {
             products: [],
             cart: [],
             numberOfItems: 0
  
         }
     };
     cartItems = (tt) => {
    this.setState({
        cart: [...this.state.cart, tt],
         numberOfItems :this.state.cart.length

    })
         console.log("tt",tt)
    console.log("cart",this.state.cart)
    // Toast.success('Product added to cart', 5000);
 }
componentDidMount() {
    axios.get("/find_product") 
     .then( (response) => {
         this.setState({
             products :  response.data
         })
         console.log("response",this.state.products);
        
     })
     .catch((error) => {
       console.log(error);
     });

}



displayList = () => {
 return    this.state.products.map((pro, index) => {
     return <ProductItem   product={pro} callBackFromParent={this.cartItems} />;
    }) 
 };
     displayCart = () => {
         return this.state.cart.map((pro, index) => {
             return <div > {pro.pages}</div>;
         })
    }
     render() {

        return (
            <Router>
            <div>
                <table className="table-sm" style={{ marginTop: 20 }}>
<tr>
      <th scope="col" style={{width: 190}}>Description</th>
      <th scope="col" style={{width: 90}}>Pages</th>
      <th scope="col" style={{width: 190}}>Writer</th>
                    </tr>
                    </table>
                {this.displayList()} 
                {/* CartItems :  {this.state.cart} */}
                Your Cart         <Link className="nav-link" to="/cart">Cart</Link>
                {/* {this.displayCart()} */}
            </div> 
                <Route path="/cart"
                    render={(routeProps) => (<CartList {...routeProps} name={this.state.cart}/>)} />
            </Router>
        )
    }
}
export default Product_Data;