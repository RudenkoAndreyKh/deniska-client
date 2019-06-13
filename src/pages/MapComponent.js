import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/MainPage.css'
import AuthService from '../services/AuthService'
import { Redirect } from 'react-router-dom'
import AuthorizeHttpRequestService from '../services/AuthHttpRequestService';
import GoogleMapReact from 'google-map-react';
import TableForMap from '../TableForMapComponent';

const Marker = props => {
    return <i className="fas fa-map-marker-alt icon"></i>
}

export default class Map extends Component {
    constructor() {
        super();
        this.state = {
            center: {
                lat: 10,
                lng: 10
            },
        };
        this.auth = new AuthService();
        this.authReq = new AuthorizeHttpRequestService();
    }

    setMarkerOfCoptersPos = copter => {
        console.log("long", copter.longitude);
        console.log("lat", copter.latitude);
        this.setState({
            center: {
                lat: copter.latitude,
                lng: copter.longitude,
            }
        })
        this.setState({})
    }

    static defaultProps = {
        center: {
            lat: 10,
            lng: 10
        },
        zoom: 11
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
                        <a className="brand" href="/">CopterRent</a>
                        <a href="/copter-table">Copters</a>
                        <a href="/users-table">Users</a>
                        <a href="/statistics">Statistics</a>
                        <a className="disabled" href="/Map">Map</a>
                        <a className="logout" href="/login" onClick={() => {
                            this.auth.logout();
                        }}>Logout</a>
                    </div>
                </div>

                <div className="map">
                    <TableForMap setMarkerOfCoptersPos={this.setMarkerOfCoptersPos} />
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyAmgArOyg9AHCkSMbunJIcdJTL9av8E-ig" }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                        center={this.state.center}
                    >
                        <Marker lat={this.state.center.lat} lng={this.state.center.lng} />
                    </GoogleMapReact>
                </div>

            </div>
        );
    }
}