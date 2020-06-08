import React, {Component} from 'react';

import SideBar from '../SideBar';
import Topbar from '../Topbar';
import Spin from '../../admin/Spin';
import CustomerTable from './CustomerTable';
import LogoutModal from '../LogoutModal';

import axios from 'axios';
import {Container, Row, Col} from 'reactstrap';
import {FormGroup, Label, Input} from 'reactstrap';

export default class Index extends Component {

    state = {
        blocks: [],
        isLoading: false,
        idBlockSelected: null,
        block: null
    }

    componentDidMount() {
        this.getBlocks();
    }

    getBlocks = async () =>{
        this.setState({
            isLoading: true
        });

        let user = JSON.parse(localStorage.getItem('user'));
        let token = localStorage.getItem('token');
        const getBlocks = await axios({
            url: `http://localhost:8001/block/get-block?token=${token || ''}&userId=${user ? user.id : ''}`,
            method: 'GET'
        });
        
        if (getBlocks) {
            if (getBlocks.data && getBlocks.data.data) {
                const {blocks = []} = getBlocks.data.data;

                this.setState({
                    blocks,
                    idBlockSelected: blocks[0].id,
                    isLoading: false,
                    block: blocks[0]
                });
            }
        }
    }

    onChangeSelected = (e) => {
        const {value} = e.target;

        if (value) {
            const block = this.state.blocks.find(block => block.nameBlock === value);

            this.setState({
                idBlockSelected: +block.id,
                block
            });
        }
    }

    renderSelectBlock = () =>{

        if (Array.isArray(this.state.blocks) && this.state.blocks.length > 0) {
            return this.state.blocks.map(block => {
                return <React.Fragment key={block.id}>
                    <option onClick={() => this.onClickBlock(block.id)}>{block.nameBlock}</option>
                </React.Fragment>;
            });
        }
    }

    render() {
        return (
            <div>
                {this.state.isLoading ?  <Spin /> : null} 
                {/* Page Wrapper */}
                <div id="wrapper">                  
                    <SideBar />
                    {/* Content Wrapper */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        {/* Main Content */}
                        <div id="content">
                            {/* Topbar */}
                            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                                {/* Topbar Navbar */}
                                <ul className="navbar-nav ml-auto">
                                    {/* Nav Item - Search Dropdown (Visible Only XS) */}
                                    <li className="nav-item dropdown no-arrow d-sm-none">
                                        <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fas fa-search fa-fw" />
                                        </a>
                                        {/* Dropdown - Messages */}
                                        <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                                            <form className="form-inline mr-auto w-100 navbar-search">
                                                <div className="input-group">
                                                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-primary" type="button">
                                                            <i className="fas fa-search fa-sm" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </li>
                                    {/* Nav Item - Alerts */}                                    
                                    <Topbar />
                                </ul>
                            </nav>
                            {/* End of Topbar */}
                        
                            {/* Begin Page Content */}
                            <div className="container-fluid">
                                <Container>
                                    <Row>
                                        <Col />
                                        <Col xs="6" sm = "4">
                                            <FormGroup>
                                                <Label for="exampleSelect">Khu trọ</Label>
                                                <Input onChange={this.onChangeSelected} type="select" name="select" id="exampleSelect">
                                                    {this.renderSelectBlock()}
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Container>
                                <CustomerTable idBlock={this.state.idBlockSelected} block= {this.state.block} />
                            </div>
                            {/* /.container-fluid */}
                        </div>
                        {/* End of Main Content */}
                        {/* Footer */}
                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright © Your Website 2019</span>
                                </div>
                            </div>
                        </footer>
                        {/* End of Footer */}
                    </div>
                    {/* End of Content Wrapper */}
                </div>
                {/* End of Page Wrapper */}
                {/* Scroll to Top Button */}
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up" />
                </a>
                {/* Logout Modal */}
                <LogoutModal />
            </div>

        );
    }
}
