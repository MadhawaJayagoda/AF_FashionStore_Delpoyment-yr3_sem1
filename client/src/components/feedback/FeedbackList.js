import React, { Component } from 'react'
import axios from 'axios';

export default class FeedbackList extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             products: [],
             feedback: []

        }
    }

    componentDidMount(){
        const url = "/product";
        fetch(url)
        .then(res => res.json())
        .then(json => this.setState({
            products: json
        }))
        .catch(err => console.log(err));

        fetch("/comments")
        .then(res => res.json())
        .then(json => this.setState({
            feedback: json
        }))
        .catch(err => console.log(err))
    }

    handleFeedback = e => {
        console.log(e.target.value);
        return(
            window.location.href = '/comment/'+e.target.value
        )
        
    }
    
    removeFeedback(id){
        axios.delete("/comments/"+id)
        .then(res => {
            console.log(res);
            this.componentDidMount()
        })
        .catch(err => console.log(err));
    }

    
    render() {
        return (
            <div className="container mt-3">
                <div className="display-4 text-center p-2">
                    My FeedBack
                </div>
                <div className="row">
                    {
                        this.state.products.map(product =>
                            <div  key={product._id} className="col-sm-6 col-md-5 col-lg-4 mt-2 p-2">

                                {console.log(product)}

                                <div className="card shadow-sm">

                                    <div className="card-header text-center" >
                                        <b>{product.productName}</b>
                                    </div>

                                    <div className="card-body bg-light">

                                        <div className="row ml-2">
                                            <b className="col-50">Category: </b>
                                            <div className="col  text-info">{product.product_category}</div>
                                        </div>
                                        <div className="row ml-2">
                                            <b className="col-50">Brand: </b>
                                            <div className="col">{product.productBrand}</div>
                                        </div>
                                        <div className="row ml-2">
                                            <b className="col-50">Description: </b>
                                            <div className="col">{product.productDescription}</div>
                                        </div>
                                        <div className="row ml-2">
                                            <b className="col-50">Price: </b>
                                            <div className="col">{product.product_unitprice}</div>
                                        </div>

                                        <button onClick={this.handleFeedback} value={product._id} className="btn btn-outline-primary btn-sm float-right mt-2 mr-1">Add Feedback</button>

                                        <hr className="mt-5"/>

                                        <ul className="">
                                            {
                                                 this.state.feedback.filter(feedback => feedback.productId === product._id).map(feedback =>
                                                
                                                    <li className="bg-secondary text-white mb-2 pb-2 pr-1 pl-1">Raring : {feedback.rating}<br/>Comment: {feedback.comment} 
                                                        <button onClick={() => this.removeFeedback(feedback._id)} className="btn btn-danger btn-sm border rounded-circle float-right mb-3">X</button>
                                                    </li>    
                                                )
                                            }
                                            
                                        </ul>
                        
                                    </div>
                                </div>

                            </div>
                            
                        )
                    }
                </div>
                
            </div>
        )
    }
}
