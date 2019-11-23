import React, { Component } from 'react'


export default class CartList extends Component {
    displayCart = () => {
        return    this.props.name.map((pro, index) => {
            return <div > {pro.pages}</div>;
           }) 
        };
    render() {
        return (
            <div>
                {this.displayCart()}
                </div>
        )
    }
}
