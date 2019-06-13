import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/MainPage.css'
import AuthService from '../services/AuthService'
import { Redirect } from 'react-router-dom'
import AuthorizeHttpRequestService from '../services/AuthHttpRequestService';
import Modal from 'react-modal';

Modal.setAppElement('#root')

export default class MainPage extends Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
        };
        this.auth = new AuthService();
        this.authReq = new AuthorizeHttpRequestService();

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    };
    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#007bff';
    };
    closeModal() {
        this.setState({ modalIsOpen: false });
    };
    render() {

        if (!this.auth.loggedIn()) {
            return <div>
                <Redirect to="/login" />
            </div>
        } else return (
            <div className="mainPage" style={{ display: 'flex', flexDirection: "column", }}>
                <div className="navigation" style={{ position: 'relative' }}>
                    <div className="navLinks">
                        <a className="disabled" className="brand" href="/">CopterRent</a>
                        <a href="/copter-table">Copters</a>
                        <a href="/users-table">Users</a>
                        <a href="/statistics">Statistics</a>
                        <a href="/map">Map</a>
                        <a className="logout" href="/login" onClick={() => {
                            this.auth.logout();
                        }}>Logout</a>
                    </div>
                </div>



                <div className="video" style={{ position: 'relative' }}>
                    <section className="fullsize-video-bg">
                        <div className="inner">
                            <div>
                                <h1>Quadcopters rent</h1>
                                <p>Kharkiv</p>
                            </div>
                        </div>
                        <div id="video-viewport">
                            <video id="video" autoPlay muted loop>
                                <source src="http://goprokat.com.ua/wp-content/uploads/2017/02/od.mp4" type="video/mp4" />
                                <source src="http://goprokat.com.ua/wp-content/uploads/2017/02/od.webm" type="video/webm" />
                                <source src="http://goprokat.com.ua/wp-content/uploads/2017/02/od.ogv" type="video/ogv" />
                            </video>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}