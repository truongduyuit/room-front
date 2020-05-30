import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap';
import {toast, ToastContainer} from 'react-toastify';
import Spin from '../../admin/Spin';
import axios from 'axios';

export default class RoomRow extends Component {

    state = {
        isOpenModal: false,
        isOpenModalDelete: false,
        isLoading: false,
        nameRoom: '',
        maxPeople: null,
        floor : null,
        square: null,
        price: null,
        description: '',
        status: ''
    }

    onChange(e) {
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
            nameRoom: this.props.room.nameRoom,
            maxPeople: this.props.room.maxPeople,
            floor : this.props.room.floor,
            square: this.props.room.square,
            price: this.props.room.price,
            description: this.props.room.description,
            status: this.props.room.status
        });
    }

    onEditing= async () =>{
        this.setState({
            isLoading: true
        });

        let token = localStorage.getItem('token');

        const result = await axios({
            url: `http://localhost:8001/room/update/${this.props.room.id}?token=${token || ''}`,
            method: 'PUT',
            data: {
                nameRoom: this.state.nameRoom,
                maxPeople: +this.state.maxPeople,
                floor: +this.state.floor,
                square: +this.state.square,
                price: +this.state.price,
                description: this.state.description,
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
                    isOpenDeleteModal: false
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
                    <td>{this.props.room.nameRoom}</td>
                    <td>{this.props.room.floor}</td>
                    <td>{this.props.room.square}</td>
                    <td>{this.props.room.maxPeople}</td>
                    <td>{this.props.room.price}</td>
                    <td>{this.props.room.description}</td>
                    <td>{this.props.room.status === 0 ? 'Còn trống' : 'Đã thuê'}</td>
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
                        <Button color="primary" onClick={this.onEditing}>Sửa</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Hủy</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.isOpenModalDelete} toggle={this.toggleDelete}>
                    {this.state.isLoading ?  <Spin /> : null}  
                    <ModalHeader toggle={this.toggleDelete}>THÔNG BÁO</ModalHeader>
                    <ModalBody>
                        Chắc chắn muốn xóa phòng {this.props.room.nameRoom} ?
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
