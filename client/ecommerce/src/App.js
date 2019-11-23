import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import './App.css';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import CartList from './CartList';
class App extends Component {
   
    render() {
    return (
        <Router>
            <div>
                      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <Link className="nav-link" to="/addProduct">Add Product </Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/ProductList">Product List</Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/cart">Cart</Link>
      </li>
     
    </ul>
  </div>
</nav>
            <Route path="/addProduct" exact component={AddProduct} />
            <Route path="/ProductList" exact component={ProductList} />
            </div>
</Router>
  
            )
    }
}
;
export default App;
