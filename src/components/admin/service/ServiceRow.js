import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap';
import {toast, ToastContainer} from 'react-toastify';
import Spin from '../../admin/Spin';
import axios from 'axios';

export default class ServiceRow extends Component {

    state = {
        isOpenModal: false,
        isOpenModalDelete: false,
        isLoading: false,
        nameService: '',
        price: null,
        description: '',
        nameUnit: '',
        selectIdUnit: null,
        units: []
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

    onGetUnit = async () =>{
        this.setState({
            isLoading: true
        });

        let token = localStorage.getItem('token');

        const result = await axios({
            url: `http://localhost:8001/unit/get-units?token=${token || ''}`,
            method: 'GET'
        });

        this.setState({
            isLoading: false
        });
        if (result) {
            if (result.data && result.data.data) {
                this.setState({
                    units : result.data.data.units
                });
            } 
        } 
    }

    onChangeSelected = (e) => {
        const {value} = e.target;

        if (value) {
            const unit = this.state.units.find(unit => unit.name === value);

            this.setState({
                selectIdUnit: unit.id,
                nameUnit: value
            });
        }
    }

    onClickEdit = () => {
        this.onGetUnit();
        this.setState({
            isOpenModal: true,
            nameService: this.props.service.nameService,
            price: this.props.service.price,
            idUnit : this.props.service.idUnit,
            description: this.props.service.description,
            nameUnit: this.props.service.nameUnit
        });

    }

    onEditing= async () =>{
        this.setState({
            isLoading: true
        });

        let token = localStorage.getItem('token');

        const result = await axios({
            url: `http://localhost:8001/service/update/${this.props.service.id}?token=${token || ''}`,
            method: 'PUT',
            data: {
                description: this.state.description,               
                price: +this.state.price,
                idUnit: +this.state.idUnit,
                id : +this.props.service.id
            }
        });

        this.setState({
            isLoading: false
        });
        if (result) {
            if (result.data && result.data.data) {
                toast.success('Chỉnh sửa dịch vụ thành công !');

                this.setState({
                    isOpenModal: !this.state.isOpenModal
                });
                this.props.callback(true);
            } else {

                toast.error('Chỉnh sửa dịch vụ thất bại !');
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
            url: `http://localhost:8001/service/delete/${this.props.service.id}?token=${token || ''}`,
            method: 'DELETE'
        });

        if (result) {
            if (result.data && result.data.data) {
                toast.success('Xóa dịch vụ thành công !');
               
                this.setState({isOpenModalDelete: false});
                
                this.props.callback(true);
    
            } else {

                toast.error('Xóa dịch vụ thất bại !');
            }
        } 

        this.setState({
            isLoading: false
        });
    }

    onClickUnit = id =>{
        this.setState({
            selectIdUnit : +id
        });
    }

    renderUnits = () =>{

        if (Array.isArray(this.state.units) && this.state.units.length > 0) {
            return this.state.units.map(unit => {
                return <React.Fragment key={unit.id}>
                    <option 
                        onClick={() => this.onClickUnit(unit.id)}   
                        // value = {this.state.nameUnit}                   
                    >{unit.name}
                    </option>
                </React.Fragment>;
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <tr>
                    <td>{this.props.service.nameService}</td>
                    <td>{this.props.service.price}</td>
                    <td>{this.props.service.nameUnit}</td>
                    <td>{this.props.service.description}</td>
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
                    <ModalHeader toggle={this.toggle}>CHỈNH SỬA DỊCH VỤ</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="nameBlock">Tên phòng khu trọ/ căn hộ: </Label>
                                <Input type="text" name="nameBlock" id="nameBlock" disabled value={this.props.block.nameBlock} />
                                <Label for="nameService">Tên dịch vụ: </Label>
                                <Input type="text" name="nameService" id="nameService" disabled onChange={(e) => this.onChange(e)} value={this.state.nameService} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Mô tả</Label>
                                <Input type="textarea" name="description" id="description" onChange={(e) => this.onChange(e)} value={this.state.description} />
                                <Label for="price">Đơn giá (*) </Label>
                                <Input type="number" name="price" id="price" onChange={(e) => this.onChange(e)} value={this.state.price} />                  
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect">Đơn vị</Label>
                                <Input onChange={this.onChangeSelected} type="select" name="select" value={this.state.nameUnit} id="exampleSelect">
                                    {this.renderUnits()}
                                </Input>
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
                        Chắc chắn muốn xóa dịch vụ {this.props.service.nameService} ?
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
