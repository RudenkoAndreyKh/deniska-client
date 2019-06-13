import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/AuthPage.css'
import AuthService from '../services/AuthService'
import { Link, Redirect } from 'react-router-dom'

export default class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        }
        this.auth = new AuthService();
    }
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
    login(e) {
        e.preventDefault();
        this.auth.login(this.state.email, this.state.password)
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
                        <form className="form col-sm-4" onSubmit={(e) => this.login(e)}>
                            <div className="formBack"></div>
                            <h1>Login</h1>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" value={this.state.email || ''} onChange={(e) => this.emailChange(e)} className="form-control" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" value={this.state.password || ''} onChange={(e) => this.passwordChange(e)} className="form-control" placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <Link to={{ pathname: '/registration' }}>registration</Link>
                        </form>
                    </div>
                </div>
            );
        }
    }
}