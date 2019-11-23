import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default class AddProduct extends Component {
  
    constructor(props) {
        super(props);


        this.state = {
            description: "first description",
            pages: "s200",
            writer: "Tudo Frank"
        }
    }
    onChangedes(e) {
        this.setState({
           description: e.target.value,
        //    pages: e.target.pages,
        //    writer: e.target.writer
        })
    }
    onChangepages(e) {
        this.setState({
        //    description: e.target.description,
           pages: e.target.value,
        //    writer: e.target.writer
        })
    }
    onChangewriter(e) {
        this.setState({
        //    description: e.target.description,
        //    pages: e.target.pages,
           writer: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const payload = {
            "description": this.state.description,
            "pages": this.state.pages,
            "writer": this.state.writer
}
        console.log("payload",payload);
        axios.post("/add_product", payload)
            .then(response => { console.log(response) });
        
            this.setState  ({
                description: "first description",
                pages: "s200",
                writer: "Tudo Frank"
            })
        console.log(this.state.description);
        console.log(this.state.pages);
        console.log(this.state.writer);
    }
 
    render() {
        return (
            <div>
             <form onSubmit={(e)=>this.onSubmit(e)}>
                    <input type="text"  placeholder="Enter pages" name="pages" value={this.state.pages} onChange={ (e)=> this.onChangepages(e)} /> <input type="text"  placeholder="Enter writer" name="writer"  value={this.state.writer} onChange={ (e)=> this.onChangewriter(e)} />
                    <input type="description" placeholder="Enter description" name="description"  value={this.state.description} onChange={ (e)=> this.onChangedes(e)} />

  <button type="submit" className="btn btn-primary">Submit</button>
                </form>       
            </div>
        )
    }
}
