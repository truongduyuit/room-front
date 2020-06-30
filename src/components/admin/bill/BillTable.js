// Libraries
import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Modal, ModalHeader, ModalBody, Input} from 'reactstrap';
import {toast, ToastContainer} from 'react-toastify';
import numeral from 'numeral';
import {Form, Button, Checkbox, Row, Col, Divider, Select, DatePicker} from 'antd';
import moment from 'moment';

// Actions
import {GET_ROOMS} from '../../../actions/RoomAction';

// Components
import Spin from '../../admin/Spin';
import BillRow from './BillRow';

const {Option} = Select;

const layout = {
    labelCol: {
        span: 24
    },
    wrapperCol: {
        span: 24
    }
};

class BillTable extends Component {
    formRef = React.createRef();

    state = {
        bills: [],
        rooms: [],
        services: [],
        isOpenModal: false,
        isLoading: false,
        isLoadingForm: false,
        isCheckedOut: false,
        totalPrice: null
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
            this.getBills();
            this.getRooms();
            this.getServices();
        }
    }

    getBills = async () =>{
        this.setState({
            isLoadingForm: true
        });

        let token = localStorage.getItem('token');
        const getBills = await axios({
            url: `http://localhost:8001/bill/get-bills/${this.props.idBlock}?token=${token || ''}`,
            method: 'GET'
        });

        if (getBills) {
            if (getBills.data && getBills.data.data) {
                const {bills = []} = getBills.data.data;

                this.setState({
                    bills
                });
            } 
        }

        this.setState({isLoadingForm: false});
    }

    getServices = async () =>{
        this.setState({
            isLoadingForm: true
        });

        let token = localStorage.getItem('token');
        const getServices = await axios({
            url: `http://localhost:8001/service/get-services?token=${token || ''}&idBlock=${this.props.idBlock}`,
            method: 'GET'
        });

        if (getServices) {
            if (getServices.data && getServices.data.data) {
                const {services = []} = getServices.data.data;

                this.setState({
                    services
                });
            } 
        }

        this.setState({isLoadingForm: false});
    }

    addServiceModal = () =>{
        this.setState({
            isOpenModal: true,
            isLoading: false
        });
    }

    callBackBillRow = (value) =>{
        if (value) {
            this.getBills();
        }
    }

    renderBills = () => {
        const {bills = []} = this.state;

        if (Array.isArray(bills) && bills.length > 0) {
            return bills.map(bill => {
                return <React.Fragment key={bill.id}>
                    <BillRow 
                        bill={bill}
                        callback = {this.callBackBillRow}
                        block= {this.props.block}
                        rooms = {this.state.rooms}
                        services = {this.state.services}
                    />
                </React.Fragment>;
            });
        }
    }

    onFinish = async (value) => {

        let token = localStorage.getItem('token');

        this.setState({
            isLoading: true
        });

        const {services} = this.state;

        let billDetail = [];

        services.filter(service => {
            if (service.number && service.number > 0)
            {
                billDetail = [...billDetail,{
                    idService: +service.id,
                    amount: +service.number,
                    totalPrice: +service.total
                } ]; 
            }
        });

        if (billDetail.length === 0 )
        {
            toast.error('Hóa đơn phải có ít nhất 1 dịch vụ !');
            this.setState({isLoading: false});
            return;
        }

        const create = await axios({
            method: 'POST',
            url: `http://localhost:8001/bill/create?token=${token || ''}`,
            data: {
                idRoom: +value.room,
                dateCheckOut: moment(value.dateCheckOut).format('YYYY-MM-DD'),
                totalPrice: +this.state.totalPrice,
                isCheckedOut: this.state.isCheckedOut === true ? 1 : 0,
                billDetail
            }
        });

        if (create) {
            if (create.data && create.data.data) {
                toast.success('Thêm hóa đơn thành công !');
                
                this.setState({
                    isOpenModal: !this.state.isOpenModal,
                    optionCustomers: []
                });

                this.getBills();
            } else {
                toast.error('Thêm hóa đơn thất bại !');
            }
        }

        this.setState({isLoading: false});
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

    renderSelectRoom = () =>{
        const {rooms} = this.state;

        if (Array.isArray(rooms) && rooms.length > 0) {
            return rooms.map(room => {
                return <React.Fragment key={room.id}>
                    <option onClick={() => this.onClickBlock(room.id)}>{room.nameRoom}</option>
                </React.Fragment>;
            });
        }
    }

    onChangeSelected = () => {

    }

    onChangeIsCheckout = () =>{
        this.setState({
            isCheckedOut: !this.state.isCheckedOut
        });
    }

    onChangeNum = (event, price, index) => {
        if (event.target.value !== '') {
            let services = [...this.state.services];
            let newService = this.state.services[index];

            newService = {
                ...newService,
                number: +event.target.value < 0 ? 0 : +event.target.value,
                total: +event.target.value < 0 ? 0 * price : event.target.value * price
            };
            services[index] = newService;

            this.setState({
                services
            });
        
            // console.log(services);
            if (Array.isArray(services) && services.length > 0) {
                let totalPrice = 0;

                services.map(service => {
                    if (service.total && service.number > 0)
                    {totalPrice += service.total}
                    else if (service.number > 0)
                    {totalPrice += service.number ? service.price * service.number : service.price}
                });
                
                this.setState({
                    totalPrice
                });
            }
        }
    }

    renderServices = () => {
        const {services} = this.state;

        if (Array.isArray(services) && services.length > 0) {
            return services.map((service, index) => {
                let {total = 0} = service;
                let {number = 0} = service;
                
                return <React.Fragment key={service.id}>
                    <tr>
                        <td>{service.nameService}</td>
                        <td>{numeral(service.price).format('0,0')}</td>
                        <td><Input type= 'number' defaultValue={0} value={number} name='amount' onChange = {(e) => this.onChangeNum(e, service.price, index)} /></td>
                        <td>{numeral(total).format('0,0')}</td>
                    </tr>
                </React.Fragment>;
            });
        }
    }

    render() {
        const {idBlock} = this.props;
        const {bills} = this.state;

        return (
            <div style={{position: 'relative'}}>   
                {this.state.isLoadingForm ?  <Spin /> : null}       
                <div className="card shadow mb-4">
                    <div className="card-header py-3 row" style = {{display : 'flex', alignItems : 'center', justifyContent : 'space-between'}}>
                        <div className="sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">QUẢN LÝ DANH SÁCH HÓA ĐƠN</h6>                          
                        </div>
                        <div>
                            <Button 
                                outline color= {idBlock === null ? 'secondary' : 'primary' }
                                disabled={idBlock === null ? true : false}
                                title = {idBlock === null ? 'Phải có ít nhất 1 khu trọ để thực hiện thêm hóa đơn' : ''}
                                onClick = {this.addServiceModal}
                            >Thêm hóa đơn</Button>{' '}                                 
                        </div>
                                   
                    </div>
                    
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <th>Tên phòng</th>
                                        <th>Ngày tạo</th>
                                        <th>Tổng giá</th>
                                        <th>Trạng thái</th>

                                        <tr />
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderBills()}                      
                                </tbody>
                                
                            </table>
                            {bills.length == 0 ? <div style={{display: 'flex', justifyContent: 'center'}}>
                                                Hiện tại chưa có dữ liệu
                            </div> : ''}
                        </div>
                    </div>
                </div>       
                <Modal isOpen={this.state.isOpenModal} toggle={this.toggle}>
                    {this.state.isLoading ?  <Spin /> : null}       
                    <ModalHeader toggle={this.toggle}>THÊM HÓA ĐƠN</ModalHeader>
                    <ModalBody>
                        <Form {...layout} ref={this.formRef} onFinish={this.onFinish} initialValues = {{
                            dateCheckOut : moment(Date.now())
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
                                            {this.state.rooms.map(room => (
                                                <Option key={room.id}>{room.nameRoom}</Option>
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

export default connect(mapStateToProps, mapDispatchToProps)(BillTable);