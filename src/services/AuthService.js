import * as React from 'react';
import * as JWT from "jsonwebtoken";
import axios from 'axios';




export default class AuthService extends React.Component {

    self = this;
    // Initializing important variables
    constructor() {
        super();
        this.state = {
            domain: 'http://around-dev1.azurewebsites.net/api/Auth/'
        };
        this.fetch = this.fetch.bind(this);
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);
    };

    deleteAllCopters() {
        for (let i = 1; i < 100; i++) {
            axios.delete(`http://around-dev1.azurewebsites.net/api/Copter/${i}`)
                .then((response) => {
                    console.log("deleting",response);
                });
        };
    };


    login(email, password) {
        return axios.post(this.state.domain + 'authenticate', {
            email,
            password,
            'Access-Control-Allow-Headers': "*",
            'Access-Control-Allow-Origin': "*"
        })
            .then((response) => {
                this.setToken(response.data.token)
                return Promise.resolve(response);
            });
    };

    registration(firstName, lastName, email, password) {
        return axios.post(this.state.domain + 'register', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phoneNumber: "23423423",
            passportNumber: "111223312",
            discount: 1,
            'Access-Control-Allow-Headers': "*",
            'Access-Control-Allow-Origin': "*"
        }
        )
            .then((response) => {
                this.setToken(response.data.token);
                return Promise.resolve(response);
            });
    };

    loggedIn() {
        const token = this.getToken();
        return !!token && this.isTokenExpired(token);
    };

    isTokenExpired(token) {
        try {
            const decoded = JWT(token);
            if (decoded.exp > (Date.now() / 100)) {
                return false;
            }
            else
                return true;
        }
        catch (err) {
            return true;
        };
    };

    setToken(idToken) {
        if (typeof (window) !== "undefined") {
            window.localStorage.setItem('id_token', JSON.stringify(idToken))
        };
    };

    getToken() {
        if (typeof (window) !== "undefined") {
            return window.localStorage.getItem('id_token') || "";
        };
    };

    logout() {
        if (typeof (window) !== "undefined") {
            window.localStorage.removeItem('id_token');
        };
    };

    getProfile() {
        return JWT(this.getToken());
    };


    fetch(url, options) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        };

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response);
    };

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        };
    };
}