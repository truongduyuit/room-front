// Libraries
import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Button} from 'antd';
import {Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap';
import {toast, ToastContainer} from 'react-toastify';

// Actions
import {GET_ROOMS} from '../../../actions/RoomAction';

// Components
import Spin from '../../admin/Spin';
import RoomRow from './RoomRow';

class RoomTable extends Component {

    state = {
        rooms : [],
        isOpenModal: false,
        isLoading: false,
        nameRoom: '',
        maxPeople: null,
        floor : null,
        square: null,
        price: null,
        description: '',
        status: ''
    }

    toggle = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        });
    }

    onChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.idBlock !== prevProps.idBlock) {
            this.getRooms();
        }
    }

    getRooms = async () =>{
        this.setState({
            isLoading: true
        });

        let token = localStorage.getItem('token');
        const getRooms = await axios({
            url: `http://localhost:8001/room/get-rooms?token=${token || ''}&idBlock=${this.props.idBlock}`,
            method: 'GET'
        });

        if (getRooms) {
            if (getRooms.data && getRooms.data.data) {
                const {rooms = []} = getRooms.data.data;

                this.setState({
                    rooms
                });
            } 
        }

        this.setState({isLoading: false});
    }

    onAdding = async () =>{
        this.setState({
            isLoading: true
        });

        let token = localStorage.getItem('token');

        const result = await axios({
            url: `http://localhost:8001/room/create?token=${token || ''}`,
            method: 'POST',
            data: {
                nameRoom: this.state.nameRoom,
                maxPeople: +this.state.maxPeople,
                floor: +this.state.floor,
                square: +this.state.square,
                price: +this.state.price,
                description: this.state.description,
                idBlock: this.props.idBlock,
                status: 0
            }
        });

        this.setState({
            isLoading: false
        });
        if (result) {
            if (result.data && result.data.data) {
                toast.success('Thêm phòng thành công !');

                this.setState({
                    isOpenModal: !this.state.isOpenModal
                });
                this.getRooms();
            } else {

                toast.error('Thêm phòng thất bại !');
            }
        } 
    }

    addBlockModal = () =>{
        this.setState({
            isOpenModal: true,
            isLoading: false,
            nameRoom: '',
            maxPeople: null,
            floor : null,
            square: null,
            price: null,
            description: '',
            status: ''
        });
    }

    callBackBlockRow = (value) =>{
        if (value) {
            this.getRooms();
        }
    }

    callBackRoomRow = value =>{
        if (value) {
            this.getRooms();
        }
    }

    renderRooms = () => {
        const {rooms = []} = this.state;

        if (Array.isArray(rooms) && rooms.length > 0) {
            return rooms.map(room => {
                return <React.Fragment key={room.id}>
                    <RoomRow 
                        room={room}
                        callback = {this.callBackRoomRow}
                    />
                </React.Fragment>;
            });
        }

    }

    render() {
        const {idBlock} = this.props;

        return (
            <div style={{position: 'relative'}}>   
                {this.state.isLoading ?  <Spin /> : null}       
                <div className="card shadow mb-4">
                    <div className="card-header py-3 row" style = {{display : 'flex', alignItems : 'center', justifyContent : 'space-between'}}>
                        <div className="sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">QUẢN LÝ DANH SÁCH PHÒNG</h6>                          
                        </div>
                        <div>
                            <Button 
                                outline color= {idBlock === null ? 'secondary' : 'primary' }
                                onClick = {this.addBlockModal}
                                disabled={idBlock === null ? true : false}
                                title = {idBlock === null ? 'Phải có ít nhất 1 khu trọ để thực hiện thêm phòng' : ''}
                            >Thêm phòng</Button>{' '}                                 
                        </div>
                                   
                    </div>
                    
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <th>Tên phòng</th>
                                        <th>Tầng</th>
                                        <th>Diện tích</th>
                                        <th>Số người tối đa</th>
                                        <th>Giá</th>
                                        <th>Mô tả</th>
                                        <th>Trạng thái</th>
                                        <tr />
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderRooms()}                      
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>       
                <Modal isOpen={this.state.isOpenModal} toggle={this.toggle}>
                    {this.state.isLoading ?  <Spin /> : null}       
                    <ModalHeader toggle={this.toggle}>THÊM PHÒNG</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="nameRoom">Tên phòng (*)</Label>
                                <Input type="text" name="nameRoom" id="nameRoom" onChange={(e) => this.onChange(e)} value={this.state.nameRoom} />
                                <Label for="floor">Tầng (*) </Label>
                                <Input type="number" name="floor" id="floor" onChange={(e) => this.onChange(e)} value={this.state.floor} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="maxPeople">Số người tối da (*) </Label>
                                <Input type="number" name="maxPeople" id="maxPeople" onChange={(e) => this.onChange(e)} value={this.state.maxPeople} />
                                <Label for="square">Diện tích (*) </Label>
                                <Input type="number" name="square" id="square" onChange={(e) => this.onChange(e)} value={this.state.square} />
                                <Label for="price">Giá (*)</Label>
                                <Input type="number" name="price" id="price" onChange={(e) => this.onChange(e)} value={this.state.price} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Mô tả</Label>
                                <Input type="textarea" name="description" id="description" onChange={(e) => this.onChange(e)} value={this.state.description} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleFile">File</Label>
                                <Input type="file" name="file" id="exampleFile" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onAdding}>Thêm</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Hủy</Button>
                    </ModalFooter>
                </Modal>
                <ToastContainer />
            </div>
        );
    }
}

const mapDispatchToProps =  {
    GET_ROOMS
};

const mapStateToProps = state => {
    return {
        roomsState: state.RoomReducer.rooms
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomTable);