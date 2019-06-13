import * as React from 'react';
import AuthService from './AuthService';
import axios from 'axios';

export default class AuthorizeHttpRequestService extends React.Component{
    constructor() {
        super();
        this.Auth = new AuthService();
    }

    getHeaders() {
        var token = this.Auth.getToken();
        return { Authorization: "Bearer ".concat(token.substr(1, token.length - 2)) };
    };

    authorizedPost(url, params) {
        
        return axios.post(
            url,
            params,
            { headers: this.getHeaders() }
        )
    };

    authorizedGet(url, params) {

        if (params != null) {
            url += this.initializeUrlParams(params);
        }

        return axios.get(
            url,
            {
                headers: this.getHeaders()
            }
        )
    };

    initializeUrlParams(params) {
        return params.map((p) => '/' + p).join('');
    }
}