import React, {Component} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {toast, ToastContainer} from 'react-toastify';
import Spin from '../../admin/Spin';
import axios from 'axios';
import {Form, Input , Button, InputNumber, Tag } from 'antd';

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

export default class RoomRow extends Component {

    state = {
        isOpenModal: false,
        isOpenModalDelete: false,
        isLoading: false,
        description: '',
        status: ''
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    toggle = () =>{
        this.setState({
            isOpenModal : !this.state.isOpenModal
        });
    }

    onClickEdit = () => {
        this.setState({
            isOpenModal: true,
            description: this.props.room.description,
            status: this.props.room.status
        });
    }

    onFinish = async (values) => {
        this.setState({
            isLoading: true
        });

        let token = localStorage.getItem('token');

        const result = await axios({
            url: `http://localhost:8001/room/update/${this.props.room.id}?token=${token || ''}`,
            method: 'PUT',
            data: {
                nameRoom: values.nameRoom,
                maxPeople: +values.maxPeople,
                floor: +values.floor,
                square: +values.square,
                price: +values.price,
                description: values.description,
                idBlock: this.props.room.idBlock,
                status: this.props.room.status
            }
        });

        this.setState({
            isLoading: false
        });
        if (result) {
            if (result.data && result.data.data) {
                toast.success('Chỉnh sửa thông tin phòng thành công !');

                this.setState({
                    isOpenModal: !this.state.isOpenModal
                });
                this.props.callback(true);
            } else {

                toast.error('Chỉnh sửa thông tin phòng thất bại !');
            }
        } 
    }

    onDelete = ()=>{
        this.setState({
            isOpenModalDelete : true
        });
    }

    toggleDelete = () =>{
        this.setState({
            isOpenModalDelete : !this.state.isOpenModalDelete
        });
    }

    onDeleting = async () =>{
        this.setState({
            isLoading: true
        });

        let token = localStorage.getItem('token');
        const result = await axios({
            url: `http://localhost:8001/room/delete/${this.props.room.id}?token=${token || ''}`,
            method: 'DELETE'
        });

        if (result) {
            if (result.data && result.data.data) {
                this.setState({
                    isOpenDeleteModal: !this.state.isOpenDeleteModal
                });
                toast.success('Xóa phòng thành công !');
               
                this.props.callback(true);
    
            } else {

                toast.error('Xóa phòng thất bại !');
            }
        } 

        this.setState({
            isLoading: false
        });
    }

    render() {
        return (
            <React.Fragment>
                <tr>
                    <td><Tag color="geekblue">{this.props.room.nameRoom}</Tag></td>
                    <td>{this.props.room.floor}</td>
                    <td>{this.props.room.square}</td>
                    <td>{this.props.room.maxPeople}</td>
                    <td>{this.props.room.price}</td>
                    <td>{this.props.room.description}</td>
                    <td>{
                        this.props.room.status === 0 ? 
                            <Tag color="green">Còn trống</Tag> : <Tag color="orange">Đã thuê</Tag>}</td>
                    <td>
                        <button onClick={this.onClickEdit} className="btn btn-warning btn-circle mr-3" title="Chỉnh sửa">
                            <i className="fa fa-pencil-square" aria-hidden="true" />
                        </button>
                        <button onClick={this.onDelete} className="btn btn-danger btn-circle" title="Xóa">
                            <i className="fa fa-trash" aria-hidden="true" />
                        </button>
                    </td>
                </tr>
                    <Modal isOpen={this.state.isOpenModal} toggle={this.toggle}>
                    {this.state.isLoading ?  <Spin /> : null}       
                    <ModalHeader toggle={this.toggle}>CẬP NHẬT THÔNG TIN PHÒNG</ModalHeader>
                    <ModalBody>
                        <Form 
                            {...layout} 
                            initialValues= {{
                                "nameRoom": this.props.room.nameRoom,
                                "maxPeople": +this.props.room.maxPeople,
                                "floor": +this.props.room.floor,
                                "square": +this.props.room.square,
                                "price": +this.props.room.price,
                                "description": this.props.room.description,
                            }}
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
                                <Button htmlType='submit' type='primary' >Cập nhật</Button>{' '}
                                <Button  onClick={this.toggle}>Hủy</Button>
                            </Form.Item>
                        </Form>
                    </ModalBody>
                </Modal> 

                <Modal isOpen={this.state.isOpenModalDelete} toggle={this.toggleDelete}>
                    {this.state.isLoading ?  <Spin /> : null}  
                    <ModalHeader toggle={this.toggleDelete}>THÔNG BÁO</ModalHeader>
                    <ModalBody>
                        Chắc chắn muốn xóa phòng {this.props.room.nameRoom} ?
                    </ModalBody>
                    <ModalFooter>
                        <Button type="primary" onClick={this.onDeleting}>Xóa</Button>{' '}
                        <Button type="secondary" onClick={this.toggleDelete}>Hủy</Button>
                    </ModalFooter>
                </Modal>               
                <ToastContainer />
            </React.Fragment>
        );
    }
}
