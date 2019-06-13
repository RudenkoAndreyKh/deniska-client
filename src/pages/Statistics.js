import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/MainPage.css'
import AuthService from '../services/AuthService'
import { Redirect } from 'react-router-dom'
import AuthorizeHttpRequestService from '../services/AuthHttpRequestService';

export default class Statistics extends Component {
    constructor() {
        super();
        this.state = {

        };
        this.auth = new AuthService();
        this.authReq = new AuthorizeHttpRequestService();
    }

    render() {

        if (!this.auth.loggedIn()) {
            return <div>
                <Redirect to="/login" />
            </div>
        } else return (
            <div className="mainPage" style={{ display: 'flex', flexDirection: "column", overflow: "hidden" }}>
                <div className="navigation" style={{ position: 'relative' }}>
                    <div className="navLinks">
                        <a className="brand" href="/">CopterRent</a>
                        <a href="/copter-table">Copters</a>
                        <a href="/users-table">Users</a>
                        <a className="disabled" href="/statistics">Statistics</a>
                        <a href="/map">Map</a>
                        <a className="logout" href="/login" onClick={() => {
                            this.auth.logout();
                        }}>Logout</a>
                    </div>
                </div>

                <div className="cards">
                    <div className="infoCard">
                        <i class="fas fa-users"></i>
                        <span>Users online: 1000</span>
                    </div>
                    <div className="infoCard">
                        <i class="far fa-life-ring"></i>
                        <span>Copters online: 1000</span>
                    </div>
                    <div className="infoCard">
                        <i class="fas fa-window-close"></i>
                        <span>Else online: 1000</span>
                    </div>

                </div>

            </div>
        );
    }
}