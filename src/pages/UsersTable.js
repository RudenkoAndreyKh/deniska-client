import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/MainPage.css'
import AuthService from '../services/AuthService'
import { Redirect } from 'react-router-dom'
import AuthorizeHttpRequestService from '../services/AuthHttpRequestService';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class UsersTable extends Component {
    constructor() {
        super();
        this.state = {
            usersData: [],
            dataIsHere: false,
            modalIsOpen: false,

        };
        this.auth = new AuthService();
        this.authReq = new AuthorizeHttpRequestService();
    }
    componentDidMount() {
        this.fetchUsersData();
    };
    fetchUsersData() {
        this.setState({
            usersData: [],
        });
        console.log("success");
        this.authReq.authorizedGet('http://around-dev1.azurewebsites.net/api/Client/clients')
            .then(response => {
                this.setState({
                    usersData: response.data,
                });
                console.log(response.data)
            });
    };

    onSortChange = (sortName, sortOrder) => {
        this.setState({
            sortName,
            sortOrder
        });
    }

    render() {

        const options = {
            sortName: this.state.sortName,
            sortOrder: this.state.sortOrder,
            onSortChange: this.onSortChange
        };


        if (!this.auth.loggedIn()) {
            return <div>
                <Redirect to="/login" />
            </div>
        } else return (
            <div className="mainPage" style={{ display: 'flex', flexDirection: "column", }}>

                <div className="navigation" style={{ position: 'relative' }}>
                    <div className="navLinks">
                        <a className="brand" href="/">CopterRent</a>
                        <a href="/copter-table">Copters</a>
                        <a className="disabled" href="/users-table">Users</a>
                        <a href="/statistics">Statistics</a>
                        <a href="/map">Map</a>
                        <a className="logout" href="/login" onClick={() => {
                            this.auth.logout();
                        }}>Logout</a>
                    </div>
                </div>


                <div className="usersTableContainer">
                    <div className="usersBootstrapTable">
                        <BootstrapTable data={this.state.usersData} options={options}>
                            <TableHeaderColumn dataField='lastName' isKey dataSort>Last Name</TableHeaderColumn>
                            <TableHeaderColumn dataField='firstName' dataSort>First Name</TableHeaderColumn>
                            <TableHeaderColumn dataField='email' dataSort>Email</TableHeaderColumn>
                            <TableHeaderColumn dataField='phoneNumber' dataSort>Phone Number</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </div>

            </div>
        );
    }
}