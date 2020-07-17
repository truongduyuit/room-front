import React, {Component} from 'react';
// import '../../assets/vendor/fontawesome-free/css/all.min.cs'
import '../../assets/css/sb-admin-2.min.css';
import Footer from './Footer';
import SideBar from './SideBar';
import Topbar from './Topbar';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import LogOutModal from './LogoutModal';
import Spin from './Spin';
import {FormGroup, Label, Input} from 'reactstrap';
import {Container, Row, Col} from 'reactstrap';
import {Card, Modal, Button} from 'antd';
import moment from 'moment';

class IndexAdmin extends Component {
    state = {
        isLogin: false,
        showDetail: false,
        blocks: [],
        isLoading: false,
        idBlockSelected: -1,
        block: null,
        rooms: [],
        notRented: [],
        valueSearch: '',
        rented: [],
        roomSelected: null
    }

    componentDidMount() {
        this.validate();
        this.getBlocks();
        this.getRoomDashBoard(this.state.idBlockSelected);
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
                
                if (blocks.length > 0) {
                    this.setState({
                        blocks,
                        idBlockSelected: +blocks[0].id,
                        isLoading: false,
                        block: blocks[0]
                    });
                }

            }
        }

        this.setState({
            isLoading: false
        });
    }

    getRoomDashBoard = async(id) =>{
        this.setState({
            isLoading: true
        });

        this.setState({
            rented : [],
            notRented :[]
        });

        let user = JSON.parse(localStorage.getItem('user'));
        let token = localStorage.getItem('token');
        const getRooms = await axios({
            url: `http://localhost:8001/room/get-rooms-dashboard?status=${-1}&idBlock=${id}&token=${token || ''}&userId=${user ? user.id : ''}`,
            method: 'GET'
        });
        
        if (getRooms) {
            if (getRooms.data && getRooms.data.data) {
                const {rooms = []} = getRooms.data.data;

                if (rooms.length > 0) {
                    this.setState({
                        rooms
                    });
                }

                if (rooms.length > 0)
                {
                    this.state.rooms.map(room => {
                        if (room.status === 1)
                        {
                            this.setState({
                                rented : [...this.state.rented, room]
                            });
                        } 
                        else 
                        {
                            this.setState({
                                notRented : [...this.state.notRented, room]
                            });
                        }
                    });
                }

            }
        }

        this.setState({
            isLoading: false
        });
    }

    onClickBlock = (id) => {
        if (id) {
            this.setState({
                idBlockSelected: +id
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

    onChangeSelected = (e) => {
        const {value} = e.target;

        if (value) {
            const block = this.state.blocks.find(block => block.nameBlock === value);

            this.setState({
                idBlockSelected: block.id,
                block
            });

            this.getRoomDashBoard(block.id);
        }    
    }

    validate = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            const validate = await axios({
                url: `http://localhost:8001/user/validate?token=${token}`,
                method: 'POST'
            });

            if (validate) {
                if (validate.data && validate.data.data) {
                    this.setState({
                        isLogin: true
                    });
                } else {
                    this.props.history.push('/dang-nhap');
                }

            }
        } else {
            this.props.history.push('/dang-nhap');
        }
    }

    renderRoomNotRented = () =>{

        const {notRented = []} = this.state;

        if (Array.isArray(notRented) && notRented.length > 0) {
            
            return notRented.map(room => {
                if (room.nameRoom.toLowerCase().indexOf(this.state.valueSearch.toLocaleLowerCase()) > -1) {
                    return <React.Fragment key={room.id}>                   
                        <Card title= {room.nameRoom}
                            onClick = {(e) =>this.showDetailRoomDashboard(e, room)}
                            room = {room}
                            style={{width: 175, 
                                height: 150, 
                                backgroundColor: 'rgb(19, 194, 194)', 
                                color: '#fff',
                                cursor: 'pointer',
                                borderRadius : '5%',
                                marginRight: '10px',
                                marginTop: '20px'}}>
                            <p><i className="fa fa-user" aria-hidden="true" /> {room.maxPeople}</p>
                            <p><i className="fa fa-usd" aria-hidden="true" /> {room.price}</p>
                        </Card>
                    </React.Fragment>;
                }
            });
        }
    }

    renderRoomRented = () =>{

        const {rented = []} = this.state;

        if (Array.isArray(rented) && rented.length > 0) {
            
            return rented.map(room => {
                if (room.nameRoom.toLowerCase().indexOf(this.state.valueSearch.toLocaleLowerCase()) > -1) {
                    return <React.Fragment key={room.id}>                   
                        <Card title= {room.nameRoom}
                            room = {room}
                            onClick = {(e) =>this.showDetailRoomDashboard(e, room)}
                            style={{width: 175, 
                                height: 150, 
                                backgroundColor: 'rgb(245, 34, 45)', 
                                color: '#fff',
                                cursor: 'pointer',
                                borderRadius : '5%',
                                marginRight: '10px',
                                marginTop: '20px'}}>
                            <p><i className="fa fa-user" aria-hidden="true" /> {room.maxPeople}</p>
                            <p><i className="fa fa-usd" aria-hidden="true" /> {room.price}</p>
                        </Card>
                    </React.Fragment>;
                }
            });
        }
    }

    showDetailRoomDashboard = (e , room) =>{
        this.setState({
            showDetail : true,
            roomSelected: room
        });

        console.log(room);
    }

    handleCancel = () =>{
        this.setState({
            showDetail : false
        });
    }

    onChangeValueSearch = (event) => {
        const {value = ''} = event.target;

        this.setState({
            valueSearch: value
        });
    }

    render() {
        const {roomSelected} = this.state;

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
                                {/* Sidebar Toggle (Topbar) */}
                                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                                    <i className="fa fa-bars" />
                                </button>

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
                                {/* Page Heading */}
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <Container>
                                        <Row>
                                            <Col xs="6" sm = "4">
                                                <FormGroup>
                                                    <Label for="exampleSelect">Khu trọ: </Label>
                                                    <Input onChange={this.onChangeSelected} type="select" name="select" id="exampleSelect">
                                                        {this.renderSelectBlock()}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="6" sm = "4" >
                                                <FormGroup>
                                                    <Label for="exampleSelect">Tìm kiếm theo tên</Label>
                                                    <Input 
                                                        onChange={this.onChangeValueSearch} 
                                                        type="text" name="roomName" id="roomName" 
                                                        placeholder = "Nhập từ khóa"
                                                        style={{width: '300px'}} />
                                                </FormGroup>                                       
                                            </Col>
                                            
                                        </Row>
                                    </Container>
                                </div>
                                {/* Content Row */}

                                <div className="row ml-4">
                                    {this.state.notRented.length > 0 ?  <div className="col-12">Chưa thuê: </div> : null}                                                               
                                    {this.renderRoomNotRented()} 
                                    {this.state.rented.length > 0 ?  <div className="col-12 mt-5">Đã thuê: </div> : null}                                       
                                    {this.renderRoomRented()}
                                    {this.state.blocks.length < 1 ? 'Chưa có khu trọ nào' : this.state.notRented.length === 0 && this.state.rented.length === 0 &&  'Khu trọ chưa có phòng nào !'}
                                    {/* {this.state.notRented.length === 0 && this.state.rented.length === 0 &&  'Khu trọ chưa có phòng nào !'}   */}
                                </div>

                            </div>
                            {/* /.container-fluid */}
                        </div>
                        {/* End of Main Content */}
                        {/* Footer */}
                        <Footer />
                        {/* End of Footer */}
                    </div>
                    {/* End of Content Wrapper */}
                </div>
                {/* End of Page Wrapper */}

                {/* Scroll to Top Button */}
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up" />
                </a>
                <LogOutModal />
                <Modal
                    visible={this.state.showDetail}
                    title={roomSelected ? 'Phòng  ' + roomSelected.nameRoom : ''}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" type="primary" onClick={this.handleCancel}>
                            OK
                        </Button>
                    ]}
                >
                    <Row>
                        <Col>
                            <b>Khu trọ: </b>
                        </Col>
                        <Col>
                            <p>{roomSelected ? roomSelected.nameBlock : ''}</p>
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col>
                            <b>Mã phòng: </b>
                        </Col>
                        <Col>
                            <p>{roomSelected ? roomSelected.codeRoom : ''}</p>
                        </Col>
                    </Row> */}
                    <Row>
                        <Col>
                            <b>Tầng: </b>
                        </Col>
                        <Col>
                            <p>{roomSelected ? roomSelected.floor : ''}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>Số người tối đa: </b>
                        </Col>
                        <Col>
                            <p>{roomSelected ? roomSelected.maxPeople : ''}</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <b>Diện tích: </b>
                        </Col>
                        <Col>
                            <p>{roomSelected ? roomSelected.square : ''}</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <b>Mô tả: </b>
                        </Col>
                        <Col>
                            <p>{roomSelected ? roomSelected.description : ''}</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <b>Ngày thuê: </b>
                        </Col>
                        <Col>
                            <p>{roomSelected && roomSelected.startDate  ? moment(roomSelected.startDate).format('DD-MM-YYYY') : 'Chưa thuê'}</p>
                        </Col>
                    </Row>
                </Modal>
            </div>
        );
    }
}

export default withRouter(IndexAdmin);