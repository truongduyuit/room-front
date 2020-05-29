import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Form, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import Spin from '../../admin/Spin';

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

    updateData= async () =>{
        this.setState({
            isLoading: true
        });

        let token = localStorage.getItem('token');
        const result = await axios({
            url: `http://localhost:8001/block/update/${this.props.block.id}?token=${token || ''}`,
            method: 'PUT',
            data: {
                id: this.props.block.id,
                nameBlock : this.state.nameBlock,
                address : this.state.address,
                description : this.state.description,
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

    onEditing = () =>{
        this.updateData();      
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
                    <td>{this.props.block.nameBlock}</td>
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
                        <Form>
                            <FormGroup>
                                <Label for="exampleNameBlock">Tên khu trọ</Label>
                                <Input type="email" name="nameBlock" id="exampleNameBlock" onChange={(e) => this.onChange(e)} value={this.state.nameBlock} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleAddress">Địa chỉ</Label>
                                <Input type="email" name="address" id="exampleAddress" onChange={(e) => this.onChange(e)} value={this.state.address} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleDescription">Mô tả</Label>
                                <Input type="email" name="description" id="exampleDescription" onChange={(e) => this.onChange(e)} value={this.state.description} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onEditing}>Chỉnh sửa</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Hủy</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.isOpenDeleteModal} toggle={this.toggle}>
                    {this.state.isLoading ?  <Spin /> : null}  
                    <ModalHeader toggle={this.toggle}>THÔNG BÁO</ModalHeader>
                    <ModalBody>
                        Chắc chắn muốn xóa khu trọ ?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onDeleting}>Xóa</Button>{' '}
                        <Button color="secondary" onClick={this.toggleDelete}>Hủy</Button>
                    </ModalFooter>
                </Modal>
                <ToastContainer />
                
            </React.Fragment>
        );
    }
}
