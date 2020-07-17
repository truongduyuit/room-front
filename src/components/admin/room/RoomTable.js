// Libraries
import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Form, Input , Button, InputNumber } from 'antd';
import {toast, ToastContainer} from 'react-toastify';

// Actions
import {GET_ROOMS} from '../../../actions/RoomAction';

// Components
import Spin from '../../admin/Spin';
import RoomRow from './RoomRow';

const {TextArea} = Input;

const layout = {
    labelCol: {
        span: 24
    },
    wrapperCol: {
        span: 24
    }
};

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18}
};

class RoomTable extends Component {

    state = {
        rooms : [],
        isOpenModal: false,
        isLoading: false,
        description: ''
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

    onChangeArea = (e) => {
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

    onFinish = async (values) => {
                this.setState({
            isLoading: true
        });

        let token = localStorage.getItem('token');

        const result = await axios({
            url: `http://localhost:8001/room/create?token=${token || ''}`,
            method: 'POST',
            data: {
                nameRoom: values.nameRoom,
                maxPeople: +values.maxPeople,
                floor: +values.floor,
                square: +values.square,
                price: +values.price,
                description: values.description,
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
            description: '',
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
                        <Form 
                            {...layout} 
                            ref={this.formRef} onFinish={this.onFinish}>
                            <Form.Item
                                {...formItemLayout}
                                name="nameRoom"
                                label="Tên phòng:"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập tên phòng'
                                    }
                                ]}
                            >
                                <Input placeholder="Nhập tên phòng" />
                            </Form.Item>

                            <Form.Item
                                {...formItemLayout}
                                name="floor"
                                label="Tầng:"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập tầng'
                                    }
                                ]}
                            >
                                <InputNumber style= {{width : "350px"}} min={1} placeholder="Nhập tên tầng" />
                            </Form.Item>

                            <Form.Item
                                {...formItemLayout}
                                name="maxPeople"
                                label="Số người tối đa:"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập số người tối đa'
                                    }
                                ]}
                            >
                                <InputNumber style= {{width : "350px"}} min={1} placeholder="Nhập số người tối đa" />
                            </Form.Item>

                            <Form.Item
                                {...formItemLayout}
                                name="square"
                                label="Diện tích:"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập diện tích'
                                    }
                                ]}
                            >
                                <InputNumber style= {{width : "350px"}} min={1} placeholder="Nhập diện tích" />
                            </Form.Item>

                            <Form.Item
                                {...formItemLayout}
                                name="price"
                                label="Giá phòng:"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập giá phòng'
                                    }
                                ]}
                            >
                                <InputNumber style= {{width : "350px"}} min={1} placeholder="Nhập giá phòng" />
                            </Form.Item>

                            <Form.Item 
                                {...formItemLayout}
                                name = 'description'
                                label="Mô tả"
                            >
                                <TextArea placeholder="Nhập mô tả" allowClear onChange={this.onChangeArea} />
                            </Form.Item>                           

                            <Form.Item
                                wrapperCol={{
                                    md: {span: 8, offset: 16}
                                }}
                            >
                                <Button htmlType='submit' type='primary' >Thêm</Button>{' '}
                                <Button  onClick={this.toggle}>Hủy</Button>
                            </Form.Item>
                        </Form>
                    </ModalBody>
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