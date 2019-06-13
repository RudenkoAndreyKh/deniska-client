import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import MainPage from '../pages/MainPage.js'
import RegistrationPage from '../pages/RegistrationPage.js'
import LoginPage from '../pages/LoginPage.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import CopterTable from '../pages/CopterTable.js';
import Statistics from '../pages/Statistics.js';
import Map from '../pages/MapComponent.js';
import UsersTable from '../pages/UsersTable.js';

export default class RouterList extends Component{
    render(){
        return(
            <BrowserRouter>
                <Route exact path='/' component={MainPage} />
                <Route path="/copter-table" component={CopterTable} />
                <Route path="/statistics" component={Statistics} />
                <Route path='/registration' component={RegistrationPage} />
                <Route path='/login' component={LoginPage} />
                <Route path='/map' component={Map} />
                <Route path='/users-table' component={UsersTable} />
            </BrowserRouter>
        )
    }
}