import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/AuthPage.css'
import AuthService from '../services/AuthService'
import { Link, Redirect } from 'react-router-dom'

export default class RegistrationPage extends Component {
    constructor() {
        super();
        this.state = {
            fName: '',
            lName: '',
            email: '',
            password: '',
        }
        this.auth = new AuthService();
    }
    lNameChange(e) {
        this.setState({
            lName: e.target.value
        })
    };
    fNameChange(e) {
        this.setState({
            fName: e.target.value
        })
    };
    emailChange(e) {
        this.setState({
            email: e.target.value
        })
    };
    passwordChange(e) {
        this.setState({
            password: e.target.value
        })
        console.log(this.state.password)
    };
    registration(e) {
        e.preventDefault();
        this.auth.registration(this.state.fName, this.state.lName, this.state.email, this.state.password)
            .then(response => {
                console.log(response);
                this.setState({
                    
                })
            })
    };
    render() {
        if (this.auth.loggedIn()) {
            return <div>
                <Redirect to="/" />
            </div>
        } else {
            return (
                <div className="authPage">
                    <div className="formCard">
                        <form className="form col-sm-4" onSubmit={(e) => this.registration(e)}>
                            <div className="formBack"></div>
                            <h1>Registration</h1>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">First Name</label>
                                <input type="text" value={this.state.fName || ''} onChange={(e) => this.fNameChange(e)} className="form-control" placeholder="Enter first name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Last Name</label>
                                <input type="text" value={this.state.lName || ''} onChange={(e) => this.lNameChange(e)} className="form-control" placeholder="Enter last name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" value={this.state.email || ''} onChange={(e) => this.emailChange(e)} className="form-control" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" value={this.state.password || ''} onChange={(e) => this.passwordChange(e)} className="form-control" placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <Link to={{ pathname: '/login' }}>login</Link>
                        </form>
                    </div>
                </div>
            );
        }
    }
}