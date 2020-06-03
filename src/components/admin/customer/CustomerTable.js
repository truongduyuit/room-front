import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label} from 'reactstrap';
import {toast, ToastContainer} from 'react-toastify';
import {Form, Input, InputNumber, Button, Checkbox, Row, Col, Divider, message} from 'antd';
import {FormInstance} from 'antd/lib/form';

// Components
import Spin from '../../admin/Spin';
import CustomerRow from './CustomerRow';

const layout = {
    labelCol: {
        span: 24
    },
    wrapperCol: {
        span: 24
    }
};

class CustomerTable extends Component {

    state = {
        customers: [],
        isOpenModal: false,
        isLoading: false,
        isLoadingForm: false
    }

    renderCustomer = () =>{
        return <CustomerRow />;
    };

    componentDidMount() {
        this.getCustomers();
    }

    componentDidUpdate(prevProps) {
        if (this.props.idBlock !== prevProps.idBlock) {
            this.getCustomers();
        }
    }

    getCustomers = async () =>{
        this.setState({
            isLoadingForm: true
        });

        let user = JSON.parse(localStorage.getItem('user'));
        let token = localStorage.getItem('token');
        const getCustomers = await axios({
            url: `http://localhost:8001/customer/get-customers?token=${token || ''}&userId=${user.id || ''}`,
            method: 'GET'
        });

        if (getCustomers) {
            if (getCustomers.data && getCustomers.data.data) {
                const {customers = []} = getCustomers.data.data;

                this.setState({
                    customers
                });
            } 
        }

        this.setState({isLoadingForm: false});
    }

    render() {
        
        return (
            <div style={{position: 'relative'}}>   
                {this.state.isLoadingForm ?  <Spin /> : null}       
                <div className="card shadow mb-4">
                    <div className="card-header py-3 row" style = {{display : 'flex', alignItems : 'center', justifyContent : 'space-between'}}>
                        <div className="sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">QUẢN LÝ KHÁCH HÀNG</h6>                          
                        </div>
                        <div>
                            <Button outline color="primary" onClick = {this.addServiceModal}>Thêm dịch vụ</Button>{' '}                                 
                        </div>
                                   
                    </div>
                    
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <th>Tên khách hàng</th>
                                        <th>Số điện thoại</th>
                                        <th>Trạng thái</th>
                                        <th>Phòng</th>
                                        <th>Đại diện phòng</th>
                                        <tr />
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderCustomer}                      
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>       
                {/* <Modal isOpen={this.state.isOpenModal} toggle={this.toggle}>
                    {this.state.isLoading ?  <Spin /> : null}       
                    <ModalHeader toggle={this.toggle}>THÊM DỊCH VỤ</ModalHeader>
                    <ModalBody>
                        <Form {...layout} ref={this.formRef} onFinish={this.onFinish}>
                            <Form.Item
                                name="nameBlock"
                                label="Khu trọ/căn hộ"
                            >
                                <strong>{this.props.block && this.props.block.nameBlock}</strong>
                            </Form.Item>
                            <Form.Item
                                name="services"
                                label="Dịch vụ"
                            >
                                {this.renderDefaultServices()}
                            </Form.Item>
                            <Divider />
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
                </Modal> */}
                <ToastContainer />
            </div>
        );
    }
}

export default CustomerTable;
