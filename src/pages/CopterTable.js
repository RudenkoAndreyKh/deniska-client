import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/MainPage.css'
import AuthService from '../services/AuthService'
import { Redirect } from 'react-router-dom'
import AuthorizeHttpRequestService from '../services/AuthHttpRequestService';
import Modal from 'react-modal';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderColor: "#007bff",
        borderRadius: "10px",
    }
};

var form;

const Edit = {
    add: {
        display: "none",
    },
    Edit: {
        display: "flex",
        flexDirection: "column",
    }
}

const add = {
    add: {
        display: "flex",
        flexDirection: "column",
    },
    Edit: {
        display: "none",
    }
}

var isEditAdd = add;
var isEditAddText = 'Adding new copter';

Modal.setAppElement('#root')


export default class CopterTable extends Component {
    constructor() {
        super();
        this.state = {
            copterData: [],
            dataIsHere: false,
            modalIsOpen: false,
            name: '',
            costPerMin: 0,
            maxSpeed: 0,
            sortName: undefined,
            sortOrder: undefined,
        };
        this.auth = new AuthService();
        this.authReq = new AuthorizeHttpRequestService();

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount() {
        this.fetchCopterData();
    };
    fetchCopterData() {
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
    nameChange(e) {
        this.setState({
            name: e.target.value,
        })
        console.log(this.state.name);
    };
    costPerMinChange(e) {
        this.setState({
            costPerMin: e.target.value,
        })
    };
    maxSpeedChange(e) {
        this.setState({
            maxSpeed: e.target.value,
        })
    };
    addNewCopter(e) {
        e.preventDefault();
        this.authReq.authorizedPost('http://around-dev1.azurewebsites.net/api/Copter', {
            name: this.state.name,
            status: 0,
            latitude: 53,
            longitude: 23,
            costPerMinute: this.state.costPerMin,
            brandId: 1,
            maxSpeed: this.state.maxSpeed,
            maxFlightHeight: 200,
            control: 1,
            droneType: 1
        }).then(response => {
            console.log("success");
            this.setState({

            })
        });
        this.closeModal();
        this.fetchCopterData();
        this.setState({})
    };
    isEditAdd(e) {
        e.preventDefault();
        if (isEditAdd === add) {
            isEditAdd = Edit;
            isEditAddText = 'Editing copter';
        } else {
            isEditAdd = add;
            isEditAddText = 'Adding new copter';
        }
        console.log(isEditAdd);
        this.setState({});
    }
    AddingConfig(copter, e) {
        console.log("confog");
        e.preventDefault();
        this.setState({
            name: copter.name,
            costPerMin: copter.costPerMinute,
            maxSpeed: copter.maxSpeed,
        })
        form = <div style={isEditAdd.Edit}>
            <button className="modalBtn" onClick={(e) => this.EditCopter(e, copter)}>Edit copter</button>
        </div>;
    }
    EditCopter(e, copter) {
        e.preventDefault();
        this.authReq.authorizedPost(`http://around-dev1.azurewebsites.net/api/Copter/${copter.id}`, {
            name: this.state.name,
            status: 0,
            latitude: 42.896080,
            longitude: 11.398645,
            costPerMinute: this.state.costPerMin,
            brandId: 1,
            maxSpeed: this.state.maxSpeed,
            maxFlightHeight: 200,
            control: 1,
            droneType: 1
        }).then(response => {
            console.log("success");
            this.setState({

            })
        });
        this.closeModal();
        this.fetchCopterData();
        this.setState({})
    }

    onSortChange = (sortName, sortOrder) => {
        this.setState({
            sortName,
            sortOrder
        });
    }
    render() {

        var columns = [
            { title: 'Name', prop: 'name' },
            { title: 'Status', prop: 'status' },
            { title: 'Cost Per Minute', prop: 'costPerMinute' },
            { title: 'Max Speed', prop: 'maxSpeed' },
            { title: 'Brand Name', prop: 'brandName' },
            { title: 'Control', prop: 'control' },
            { title: 'Max Flight Height', prop: 'maxFlightHeight' },
            { title: 'Drone Type', prop: 'droneType' },
        ];

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
                        <a className="disabled" href="/copter-table">Copters</a>
                        <a href="/users-table">Users</a>
                        <a href="/statistics">Statistics</a>
                        <a href="/map">Map</a>
                        <a className="logout" href="/login" onClick={() => {
                            this.auth.logout();
                        }}>Logout</a>
                    </div>
                </div>

                <div className="tableContainer">
                    <div className="bootstrapTable">
                        <BootstrapTable data={this.state.copterData} options={options}>
                            <TableHeaderColumn dataField='status' isKey dataSort>Status</TableHeaderColumn>
                            <TableHeaderColumn dataField='name' filter={{ type: 'TextFilter', defaultValue: '' }} dataSort>Product Name</TableHeaderColumn>
                            <TableHeaderColumn dataField='costPerMinute' dataSort>Cost Per Minute</TableHeaderColumn>
                            <TableHeaderColumn dataField='maxSpeed' dataSort>Max Speed</TableHeaderColumn>
                            <TableHeaderColumn dataField='brandName' filter={{ type: 'TextFilter', defaultValue: '' }} dataSort>Brand Name</TableHeaderColumn>
                            <TableHeaderColumn dataField='control' dataSort>Control</TableHeaderColumn>
                            <TableHeaderColumn dataField='maxFlightHeight' dataSort>Max Flight Height</TableHeaderColumn>
                            <TableHeaderColumn dataField='droneType' dataSort>Drone Type</TableHeaderColumn>
                        </BootstrapTable>
                    </div>

                    {/* <DataTable
                        keys="id"
                        columns={columns}
                        initialData={this.state.copterData}
                        initialPageLength={10}
                        initialSortBy={{ prop: 'name', order: 'descending' }}
                        pageLengthOptions={[5, 10]}
                    /> */}
                    <div>
                        <button className="addNewCopter" onClick={this.openModal}>Adding/Editing copters</button>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >

                            <h2 ref={subtitle => this.subtitle = subtitle}>{isEditAddText}</h2>
                            <button className="closeBtn" onClick={this.closeModal}><i className="fas fa-times"></i></button>
                            <form className="modalForm" style={isEditAdd.add}>
                                <label>Name</label>
                                <input type="text" name="name" value={this.state.name || ''} onChange={(e) => this.nameChange(e)} />
                                <label>Cost per minue</label>
                                <input type="number" name="costPerMinue" value={this.state.costPerMin || ''} onChange={(e) => this.costPerMinChange(e)} />
                                <label>Max speed</label>
                                <input type="number" name="maxSpeed" value={this.state.maxSpeed || ''} onChange={(e) => this.maxSpeedChange(e)} />
                                <button className="modalBtn" onClick={(e) => this.addNewCopter(e)}>Add</button>
                                <button className="modalBtnTo" onClick={(e) => this.isEditAdd(e)}>To editing</button>
                            </form>
                            <form className="modalForm" style={isEditAdd.Edit}>
                                <ul className="copterList">
                                    {this.state.copterData.map((copter, index) => {
                                        return <li className="listEl" key={index}><button className="copterListBtn" onClick={(e) => this.AddingConfig(copter, e)}>Name: {copter.name}, Cost Per Minute: {copter.costPerMinute}, Max Speed: {copter.maxSpeed}</button></li>
                                    })}
                                </ul>
                                <label>Name</label>
                                <input type="text" name="name" value={this.state.name || ''} onChange={(event) => { this.nameChange(event) }} />
                                <label>Cost per minue</label>
                                <input type="number" name="costPerMinue" value={this.state.costPerMin || ''} onChange={(event) => this.costPerMinChange(event)} />
                                <label>Max speed</label>
                                <input type="number" name="maxSpeed" value={this.state.maxSpeed || ''} onChange={(event) => this.maxSpeedChange(event)} />
                                {form}

                                <button className="modalBtnTo" onClick={(e) => this.isEditAdd(e)}>To adding</button>
                            </form>
                        </Modal>
                    </div>

                </div>

            </div>
        );
    }
}