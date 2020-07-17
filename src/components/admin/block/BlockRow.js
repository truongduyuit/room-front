import React, {Component} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import Spin from '../../admin/Spin';
import {Form, Input, Button, Tag} from 'antd'; 

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

export default class BlockRow extends Component {
    state = {
        isOpenModal: false,
        isOpenDeleteModal: false,
        nameBlock: '',
        address: '',
        description : '',
        isLoading: false
    }

    toggle = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        });
    }

    toggleDelete = () =>{
        this.setState({
            isOpenDeleteModal: !this.state.isOpenDeleteModal
        });
    }

    onFinish = async (values) => {
                this.setState({
            isLoading: true
        });

        let token = localStorage.getItem('token');
        const result = await axios({
            url: `http://localhost:8001/block/update/${this.props.block.id}?token=${token || ''}`,
            method: 'PUT',
            data: {
                id: this.props.block.id,
                nameBlock : values.nameBlock,
                address : values.address,
                description : values.description,
                idOwner : this.props.block.idOwner
            }
        });

        this.setState({
            isLoading: false
        });

        if (result) {
            if (result.data && result.data.data) {
                toast.success('Cập nhật thông tin thành công !');
                
                this.props.callback(true);
            } else {

                toast.error('Cập nhật thông tin thất bại !');
            }
        } 

        this.setState({
            isOpenModal: !this.state.isOpenModal
        });
    }

    onDelete = async () =>{

        this.setState({
            isOpenDeleteModal: true
        });

    }

    onDeleting = async () =>{
        this.setState({
            isLoading: true
        });

        let token = localStorage.getItem('token');
        const result = await axios({
            url: `http://localhost:8001/block/delete/${this.props.block.id}?token=${token || ''}`,
            method: 'DELETE'
        });

        this.setState({
            isLoading: false
        });

        if (result) {
            if (result.data && result.data.data) {
                toast.success('Xóa khu trọ thành công !');
               
                this.props.callback(true);

                this.setState({
                    isOpenDeleteModal: !this.state.isOpenDeleteModal
                });
            } else {

                toast.error('Xóa khu trọ thất bại !');
            }
        } 
    }

    
    onClickEdit = () => {
        this.setState({
            isOpenModal: true,
            nameBlock : this.props.block.nameBlock,
            address: this.props.block.address,
            description : this.props.block.description
        });
    }

    onChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    render() {
        
        return (
            <React.Fragment>
                <tr>
                    <td><Tag color="#f50">{this.props.block.nameBlock}</Tag></td>
                    <td>{this.props.block.address}</td>
                    <td>{this.props.block.description}</td>
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
                    <ModalHeader toggle={this.toggle}>CHỈNH SỬA THÔNG TIN KHU TRỌ</ModalHeader>
                    <ModalBody>
                        <Form 
                            {...layout} 
                            initialValues= {{
                                "nameBlock": this.state.nameBlock,
                                "address": this.state.address,
                                "description": this.state.description,

                            }}
                            ref={this.formRef} onFinish={this.onFinish}>
                            <Form.Item
                                {...formItemLayout}
                                name="nameBlock"
                                label="Tên khu trọ:"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập tên khu trọ'
                                    }
                                ]}
                            >
                                <Input placeholder="Nhập tên khu trọ" />
                            </Form.Item>   

                            <Form.Item
                                {...formItemLayout}
                                name="address"
                                label="Địa chỉ:"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập địa chỉ'
                                    }
                                ]}
                            >
                                <Input placeholder="Nhập địa chỉ" />
                            </Form.Item>    

                            <Form.Item
                                {...formItemLayout}
                                name="description"
                                label="Mô tả:"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập mô tả'
                                    }
                                ]}
                            >
                                <Input placeholder="Nhập mô tả" />
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
                <Modal isOpen={this.state.isOpenDeleteModal} toggle={this.toggle}>
                    {this.state.isLoading ?  <Spin /> : null}  
                    <ModalHeader toggle={this.toggle}>THÔNG BÁO</ModalHeader>
                    <ModalBody>
                        Chắc chắn muốn xóa khu trọ ?
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
