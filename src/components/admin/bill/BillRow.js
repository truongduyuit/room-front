import React, {Component} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import Spin from '../../admin/Spin';
import _ from 'lodash';
import moment from 'moment';
import {Form, Button, Input, Select, Divider, Row, Col, Checkbox, DatePicker, Tag} from 'antd';
import numeral from 'numeral';

const {Option} = Select;

const layout = {
    labelCol: {
        span: 24
    },
    wrapperCol: {
        span: 24
    }
};

export default class BillRow extends Component {

    formRef = React.createRef();

    state = {
        isOpenModal: false,
        isOpenDeleteModal: false,
        isLoading: false,
        roomName: null,
        isCheckedOut: null,
        billdetail: [],
        services: [],
        totalPrice: null
    }

    onDelete = async () =>{
        this.setState({
            isOpenDeleteModal: true
        });
    }

    componentDidMount() {
        this.getBillDetail(this.props.bill.id);
        this.setState({
            isCheckedOut : this.props.bill.isCheckedOut === 1 ? true : false,
            totalPrice : this.props.bill.totalPrice
        });

    }

    getBillDetail = async (id) =>{
        this.setState({
            isLoadingForm: true
        });

        let token = localStorage.getItem('token');
        const getBillDetail = await axios({
            url: `http://localhost:8001//bill/get-bill-by-id/${id}?token=${token || ''}`,
            method: 'GET'
        });

        if (getBillDetail) {
            if (getBillDetail.data && getBillDetail.data.data) {
                const {billdetail = []} = getBillDetail.data.data;

                this.setState({
                    billdetail
                });
            } 
        }

        this.setState({isLoadingForm: false});
    }

    componentDidUpdate(prevProps) {
        if (this.props.rooms != prevProps.rooms)
        {
            this.props.rooms.some(room =>{
                if (room.id === this.props.bill.idRoom)
                {
                    this.setState({
                        roomName: room.nameRoom
                    });
                }
            });

        }
    }

    onDeleting = async () =>{
        this.setState({
            isLoading: true
        });

        let token = localStorage.getItem('token');
        const result = await axios({
            url: `http://localhost:8001/bill/delete/${this.props.bill.id}?token=${token || ''}`,
            method: 'DELETE'
        });

        this.setState({
            isLoading: false
        });

        if (result) {
            if (result.data && result.data.data) {
                toast.success('Xóa hợp đồng thành công !');
               
                this.props.callback(true);

                this.setState({
                    isOpenDeleteModal: !this.state.isOpenDeleteModal
                });
            } else {

                toast.error('Xóa hợp đồng thất bại !');
            }
        } 
        
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

    onFinish = async (value) => {
  
        let token = localStorage.getItem('token');

        this.setState({
            isLoading: true
        });

        let {billdetail} = this.state;
        let {bill} = this.props;

        const create = await axios({
            method: 'PUT',
            url: `http://localhost:8001/bill/update/${this.props.bill.id}?token=${token || ''}`,
            data: {
                idRoom: +bill.idRoom,
                dateCheckOut: moment(bill.dateCheckOut).format('YYYY-MM-DD'),
                totalPrice: +this.state.totalPrice,
                isCheckedOut: this.state.isCheckedOut === true ? 1 : 0,
                billDetail : billdetail
            }
        });

        if (create) {
            if (create.data && create.data.data) {
                toast.success('Thêm hóa đơn thành công !');
                
                this.setState({
                    isOpenModal: !this.state.isOpenModal,
                    optionCustomers: []
                });

                this.props.callback(true);
            } else {
                toast.error('Thêm hóa đơn thất bại !');
            }
        }

        this.setState({isLoading: false});
    }

    onChangeIsCheckout = () =>{
        this.setState({
            isCheckedOut: !this.state.isCheckedOut
        });
    }

    renderServices = () => {
        const {billdetail} = this.state;
        const {services} = this.props;

        return services.map(service => {
            return billdetail.map((detail, index) => {
                if (service.id === detail.idService)
                {
                    return (
                        <React.Fragment key={detail.id}>
                            <tr>
                                <td>{service.nameService}</td>
                                <td>{numeral(detail.totalPrice / detail.amount).format('0,0')}</td>
                                <td><Input type= 'number' defaultValue={detail.amount} min={1} name='amount' onChange = {(e) => this.onChangeNum(e, detail.totalPrice / detail.amount, index)} /></td>
                                <td>{numeral(detail.totalPrice).format('0,0')}</td>
                            </tr>
                        </React.Fragment>
                    );
                }
                // else
                // {
                //     return <React.Fragment key={detail.id}>
                //         <tr>
                //             <td>{service.nameService}</td>
                //             <td>{numeral(detail.totalPrice / detail.amount).format('0,0')}</td>
                //             <td><Input type= 'number' defaultValue={0} name='amount' onChange = {(e) => this.onChangeNum(e, detail.totalPrice / detail.amount, index)} /></td>
                //             <td>{numeral(0).format('0,0')}</td>
                //         </tr>
                //     </React.Fragment>;
                // }
            });
        });
    }

    onChangeNum = (event, price, index) => {

        if (event.target.value !== '') {
            let billdetail = [...this.state.billdetail];

            billdetail[index].amount = +event.target.value;
            billdetail[index].totalPrice = price * event.target.value;

            this.setState({
                billdetail
            });
        
            if (Array.isArray(billdetail) && billdetail.length > 0) {
                let totalPrice = 0;

                billdetail.map(detail => {
                    totalPrice += detail.totalPrice;
                });
                
                this.setState({
                    totalPrice
                });
            }
        }
    }

    render() {
        const {bill} = this.props;

        return (
            <React.Fragment>
                <tr>
                    <td><Tag color="geekblue">{this.state.roomName}</Tag></td>
                    <td>{moment(bill.dateCheckout).format('DD-MM-YYYY')}</td>
                    <td>{numeral(bill.totalPrice).format('0,0')} vnđ</td>
                    <td>{bill.isCheckedOut === 1 ? <Tag color="orange">Đã thanh toán</Tag> : <Tag color="green">Chưa thanh toán</Tag>}</td>
                    <td>
                        <button onClick={this.toggle} className="btn btn-warning btn-circle mr-3" title="Chỉnh sửa">
                            <i className="fa fa-pencil-square" aria-hidden="true" />
                        </button>
                        <button onClick={this.onDelete} className="btn btn-danger btn-circle" title="Xóa">
                            <i className="fa fa-trash" aria-hidden="true" />
                        </button>
                    </td>
                </tr>
                <Modal isOpen={this.state.isOpenModal} toggle={this.toggle} className='modal-contract'>
                    {this.state.isLoading ?  <Spin /> : null}  
                    <ModalHeader toggle={this.toggle}>CHỈNH SỬA THÔNG TIN HÓA ĐƠN</ModalHeader>
                    <ModalBody>
                        <Form {...layout} ref={this.formRef} onFinish={this.onFinish} initialValues = {{
                            dateCheckOut : moment(Date.now()),
                            room : this.props.bill.idRoom,
                            isCheckedOut: this.props.bill.isCheckedOut === 1 ? true : false
                        }}>
                            <Form.Item
                                label="Khu trọ/căn hộ"
                            >
                                <strong>{this.props.block && this.props.block.nameBlock}</strong>
                            </Form.Item>
                            <Divider />
                            <Row>
                                <Col xs={12}>
                                    <Form.Item
                                        label="Chọn phòng"
                                        name="room"
                                        rules={[{required: true, message: 'Hãy chọn phòng'}]}
                                    >
                                        <Select
                                            placeholder="Chọn phòng"
                                            style={{width: 200}}
                                        >
                                            {this.props.rooms.map(room => (
                                                <Option key={room.id} value={room.id}>{room.nameRoom}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={12}>
                                    <Form.Item 
                                        name="dateCheckOut" 
                                        label="Ngày tạo" 
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Hãy chọn ngày tạo hóa đơn'
                                            }
                                        ]}
                                    >
                                        <DatePicker style={{width: '200px'}} format= 'DD-MM-YYYY' />
                                    </Form.Item>
                                </Col>
                            </Row>
                                                      
                            <Form.Item
                                label = 'Danh sách dịch vụ'
                            >
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                    <thead>
                                        <tr>
                                            <th>Tên dịch vụ</th>
                                            <th>Đơn giá</th>
                                            <th>Số lượng</th>
                                            <th>Tổng giá</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderServices()}                      
                                    </tbody>
                                
                                </table>
                            </Form.Item>

                            <Divider />

                            <Row>
                                <Col xs={12}>
                                    <Form.Item
                                        label="Tổng tiền"
                                    >
                                        <strong>{numeral(this.state.totalPrice).format('0,0')}  vnđ</strong>
                                    </Form.Item>
                                </Col>
                                <Col xs={12}>
                                    <Form.Item 
                                        name = 'isCheckedOut'
                                        label="Trạng thái"
                                    >
                                        <Checkbox checked={this.state.isCheckedOut} onChange={this.onChangeIsCheckout}>Thanh toán</Checkbox>
                                    </Form.Item>
                                </Col>
                            </Row>
                            
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
                <Modal isOpen={this.state.isOpenDeleteModal} toggle={this.toggleDelete}>
                    {this.state.isLoading ?  <Spin /> : null}  
                    <ModalHeader toggle={this.toggleDelete}>THÔNG BÁO</ModalHeader>
                    <ModalBody>
                            Chắc chắn muốn hợp đồng của phòng <b>{this.state.roomName}</b>?
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
