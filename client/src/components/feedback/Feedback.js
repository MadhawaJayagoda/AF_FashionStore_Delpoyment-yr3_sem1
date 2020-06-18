import React, { Component } from 'react'
import axios from 'axios';

export default class Feedback extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            product: "",
            productId: this.props.match.params.id ,
            rating: "",
            comment: "",
            user: localStorage.getItem('user'),
            email: localStorage.getItem('email')
        }
    }

    componentDidMount(){

        const url = "/product";
        fetch(url)
        .then(res => res.json())
        .then(json => {
            const p = json.filter(product => product._id === this.props.match.params.id)
            console.log(p[0].productName)
            this.setState({
                product: p[0].productName
            })
        })
        .catch(err => console.log(err)); 

        const cmtUrl = "/comments";
        fetch(cmtUrl)
        .then(res => res.json())
        .then(json => {
            alert(json)
        })
        .catch(err => console.log(err)); 
    }

    handleRating = e => {
        this.setState({
            rating: e.target.value
        })
    }

    handleComment = e => {
        this.setState({
            comment: e.target.value
        })
    }

    onClearComment = e => {
        this.setState({
            rating: "",
            comment: ""
        })
    }

    onHandleSubmit = e => {

        const feedback = this.state;

        axios.post('/comments',feedback)
        .then(res => {
            alert("Your feadback succefully posted");
        })
        .catch(err => alert(err))

    }
    

    render() {
        return (
            <div className="container">

                <div className="justify-content-center">
                    <hr/>
                    <h2>Ratings </h2>
                    <hr />

                    <form autoComplete="off" onSubmit={this.onHandleSubmit}>
                        <div className="form-group row">
                            <label className="col-md-4 col-form-label text-md-right">Rate</label>
                            <div className="col-md-6">
                                <select className="form-control" name="rating" value={this.state.rating} onChange={this.handleRating}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-4 col-form-label text-md-right">Comment</label>
                            <div className="col-md-6">
                                <input type="text" className="form-control" name="comment" value={this.state.comment} onChange={this.handleComment} />
                                <div style={{color : "red"}}>{this.state.commentError}</div>
                            </div>
                        </div>
                                
                        <div className="col-md-4 offset-md-4">
                            <input type="submit" className="btn btn-primary"/>
                            <input type="button" className="btn btn-danger" value="Clear" onClick={this.onClearComment} />
                        </div>
                    </form>

                </div>
                
            </div>
        )
    }
}
