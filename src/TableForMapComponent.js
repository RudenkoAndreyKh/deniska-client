import React, { Component } from 'react';
import AuthService from './services/AuthService';
import AuthorizeHttpRequestService from './services/AuthHttpRequestService';
import axios from 'axios';
import $ from 'jquery';

const closed = {
    transition: "0.2s",
    transform: "translateX(-50px)"
}

const opened = {
    transition: "0.2s",
}

let isOpened = closed;

export default class TableForMap extends Component {
    constructor() {
        super();
        this.state = {
            copterData: [],
        }
        this.auth = new AuthService();
        this.authReq = new AuthorizeHttpRequestService();
    }

    componentDidMount() {
        $(".copterList").animate({ 'height': 'toggle' }, 100);
        this.setState({
            copterData: [],
        });
        console.log("success");
        this.authReq.authorizedGet('http://around-dev1.azurewebsites.net/api/Copter')
            .then(response => {
                this.setState({
                    copterData: response.data,
                });
                console.log(response.data)
            });
        this.setState({});
    };

    toggleTable = () => {
        $(".copterList").animate({ 'height': 'toggle' }, 100);
        if (isOpened === closed) {
            isOpened = opened;
        } else isOpened = closed;
        this.setState({})
    }

    rentCopter(copter) {
        let body = {
            clientId: 1,
            copterId: copter.id
        }
        axios.post('http://around-dev1.azurewebsites.net/api/Rent/create', body)
            .then(res => {
                console.log(res);
            })
    }

    async deleteCopter() {
        let rentId;
        await axios.get(`http://around-dev1.azurewebsites.net/api/Rent/user/1`)
            .then(res => {
                rentId = res.data.id;
            })

        axios.post(`http://around-dev1.azurewebsites.net/api/Cheque/create/${rentId}`)
            .then(res => {
                console.log(res);
            })
    }

    render() {
        return <div className="copterListLayout">
            <button className="toggleBtn" onClick={this.toggleTable}><i className="fas fa-bars"></i></button>
            <div className="listContainer" style={isOpened}>
                <ul className="copterList">
                    {this.state.copterData.map((copter, index) => {
                        return <li className="copterListEl" key={index}><button className="copterListBtn" onClick={() => this.props.setMarkerOfCoptersPos(copter)}>Name: {copter.name}, Cost Per Minute: {copter.costPerMinute}, Max Speed: {copter.maxSpeed}</button><button onClick={() => this.rentCopter(copter)}>Rent</button><button onClick={() => { this.deleteCopter() }}>Stop rent</button></li>
                    })}
                </ul>
            </div>
        </div>
    }
}