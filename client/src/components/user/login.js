import React from 'react';
import '../../App.css';
import { Base64 } from 'js-base64';
import api from "../../actions/api.js";
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';

import './login.css';

const initialState = {
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    userid : ""
}

toast.configure()
class Login extends React.Component {

    state =initialState;
    isPass = false;
    isEmail = false;
    status = "";

    handleChange = e => {
        const isCheckbox = e.target.type === "checkbox";
        this.setState({
            [e.target.name]: isCheckbox
                ? e.target.checked
                : e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();

        const userMail = this.state.email;
        const userPassword = this.state.password;

        if(userMail === "admin@fashionstore.com" && userPassword === "admin"){
            alert("logged as Admin");
            this.status = "logged as Admin";
            localStorage.setItem('email', 'admin@fashionstore.com');
            localStorage.setItem('name', 'admin')
            localStorage.setItem('type', 'admin')
            window.location.href = '/users';
        }else {

            const isValid = this.validate();
            if (isValid) {

                api.createUser().fetchAll().then(res => {
                    const user = res.data.filter(user => user.email === userMail)
                    if (user.length === 1) {
                        if (user[0]['password'] === Base64.encode(userPassword)) {
                            if ((user[0]['type'] === 'admin')) {
                                alert("logged as Admin");
                                this.status = "logged as Admin";
                                localStorage.setItem('email', user[0]['email'])
                                localStorage.setItem('uid', user[0]._id)
                                localStorage.setItem('name', user[0]['name'])
                                localStorage.setItem('type', user[0]['type'])
                                window.location.href = '/users';
                            } else {
                                this.status = "You Login Successfully";
                               // alert("Welcome Back " + user[0].name + "!");
                                toast.success("Welcome Back " + user[0].name + "!", {autoClose:2000})

                                this.setState({
                                    userid: user[0]._id
                                })

                                localStorage.setItem('email', user[0]['email'])
                                localStorage.setItem('uid', user[0]._id)
                                localStorage.setItem('name', user[0]['name'])
                                localStorage.setItem('type', user[0]['type'])
                                window.location.href = '/profile/' + user[0]._id;
                            }
                        } else {
                            toast.error("Login Faild! Invalid Password",{autoClose:3000})
                            this.setState({
                                passwordError: "Incorrect Password"
                            })
                            this.isPass = true;
                        }
                    } else {
                        toast.error("This Email No Register!",{autoClose:3000})
                    }
                });
            }
        }
    }

    validate = () => {
        let emailError = "";
        let passwordError = "";
        this.isEmail = false;
        this.isPass = false;

        if(!this.state.password){
            passwordError="Password Required!"
            this.isPass = true;
        }

        if(!this.state.email){
            emailError="Email Required!"
            this.isEmail = true;

        }else if(!this.state.email.includes('@')){
            emailError = "Invalid Email!";
            this.isEmail = true;
        }

        if(emailError || passwordError){
            this.setState({ emailError , passwordError});
            return false;
        }else{
            this.setState(initialState);
            this.isEmail = false;
            this.isPass = false;
        }

        return true;
    }

    render (){
        return (
            <div className="container-fluid login-bg" align="center">

                <br></br><br/>

                <div className="card shadow login-w">
                    <div className="card-header login-header text-light">
                        <h1>Login</h1>
                    </div>
                    <div className="card-body">

                        <form autoComplete="off" onSubmit={this.handleSubmit}>

                            <div className="input-group mb-3 row">
                                <label htmlFor="email" className="col-3 text-right col-form-label font-weight-light">Email</label>
                                <div className="col row ">
                                    <i className="col-1 fa fa-user p-2 bg-light border "></i>
                                    <input type="text" className="col form-control border-left-0" name="email" value={this.state.email} onChange={this.handleChange} ></input>
                                </div>
                            </div>

                            <div className="input-group mb-3 row">
                                <label htmlFor="password" className="col-3 text-right col-form-label font-weight-light">Password</label>
                                <div className="col row">
                                    <i className="col-1 fa fa-key p-2 bg-light border"></i>
                                    <input type="password" className="col form-control border-left-0" name="password" value={this.state.password} onChange={this.handleChange} />
                                </div>

                            </div>

                            <button type="submit" className="btn btn-light border-dark btn-outline-dark float-right"> Login </button>

                        </form>

                        <br/><br/>

                        <div className="p-2 small">Don't have an Account ? <Link to={"/register"} className=" btn-link p-1 pl-2 pr-2 bg-light border rounded-pill">Create an Account</Link></div>

                        <div className="alert alert-danger p-1 mb-2 mt-2" hidden={!this.isPass} role="alert">{this.state.passwordError}</div>
                        <div className="alert alert-danger p-1 " hidden={!this.isEmail} role="alert">{this.state.emailError}</div>
                        <div className="alert alert-success p-1 mt-2" hidden={this.status === ""} role="alert">{this.status}</div>


                    </div>
                </div>

            </div>


        );
    }
}

export default Login;
