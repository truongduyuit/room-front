import React, {Component} from 'react';
import axios from 'axios';
// import {connect} from 'react-redux';
import {Modal, ModalHeader, ModalBody, Row, Col, ToastBody} from 'reactstrap';
import {toast, ToastContainer} from 'react-toastify';
import {Form, Button, Input, Select, Divider, Transfer, InputNumber, DatePicker} from 'antd';
import {Label} from 'reactstrap';
import moment from 'moment';
import _ from 'lodash';

// // Actions
// import {GET_ROOMS} from '../../../actions/RoomAction';

// Components
import Spin from '../../admin/Spin';
import ContractRow from './ContractRow';

const {Option} = Select;
const {TextArea} = Input;
const {RangePicker} = DatePicker;

const layout = {
    labelCol: {
        span: 24
    },
    wrapperCol: {
        span: 24
    }
};

export default class ContractTable extends Component {
    formRef = React.createRef();

    state = {
        contracts: [],
        isOpenModal: false,
        isLoading: false,
        isLoadingForm: false,
        room: '',
        idSlave: null,
        note: '',
        idUser: '',
        idRoom: '',
        customers: [],
        targetKeys: [],
        optionCustomers: [],
        selectedKeys: [],
        disabled: false,
        rooms: []
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

    componentDidMount() {
        this.getContracts();

        let user = JSON.parse(localStorage.getItem('user'));
   
        this.setState({
            idUser : user.id
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.idBlock !== prevProps.idBlock) {
            this.getContracts();
            this.getRooms();      
        }
        if (!_.isEqual(this.props.customers, prevProps.customers)) {
            const newCustomers = this.props.customers.map(customer => ({
                ...customer,
                key: customer.id
            }));

            this.setState({customers: newCustomers});
        }
        if (!_.isEqual(this.state.targetKeys, prevState.targetKeys)) {

            const newOptionCustomers = this.state.customers.filter(customer => {
                if (this.state.targetKeys.some(target => +target === +customer.key)) {
                    return customer;
                }
            });

            this.setState({
                optionCustomers: newOptionCustomers
            });
        }
    }

    getContracts = async () =>{
        this.setState({
            isLoadingForm: true
        });

        let user = localStorage.getItem('user');
        let token = localStorage.getItem('token');
        const getContracts = await axios({
            url: `http://localhost:8001/contract/get-contracts?token=${token || ''}&userId=${user.id}`,
            method: 'GET'
        });

        if (getContracts) {
            if (getContracts.data && getContracts.data.data) {
                const {contracts = []} = getContracts.data.data;

                this.setState({
                    contracts
                });
            } 
        }

        this.setState({isLoadingForm: false});
    }

    addContractModal = () =>{
        this.setState({
            isOpenModal: true,
            isLoading: false
        });
    }

    callBackContractRow = (value) =>{
        if (value) {
            this.getContracts();
        }
    }

    callBackRoomRow = value =>{
        if (value) {
            this.getContracts();
        }
    }

    getContracts = async () =>{
        this.setState({
            isLoadingForm: true
        });

        let token = localStorage.getItem('token');
        const getContracts = await axios({
            url: `http://localhost:8001/contract/get-contracts?token=${token || ''}&idBlock=${this.props.idBlock}`,
            method: 'GET'
        });

        if (getContracts) {
            if (getContracts.data && getContracts.data.data) {
                const {contracts = []} = getContracts.data.data;

                this.setState({
                    contracts
                });
            } 
        }

        this.setState({isLoadingForm: false});
    }

    callBackServiceRow = bool => {
        if (bool) {
            this.getContracts();
        }
    }

    renderContracts = () => {
        const {
            contracts = [], 
            customers = []
        } = this.state;

        if (Array.isArray(contracts) && contracts.length > 0) {
            return contracts.map(contract => {
                return <React.Fragment key={contract.id}>
                    <ContractRow 
                        contract={contract}
                        callback = {this.callBackServiceRow}
                        block= {this.props.block}
                        customers = {customers}
                    />
                </React.Fragment>;
            });
        }
    }

    onFinish = async (value) => {
        const userRoom = this.state.optionCustomers.map(option => {
            return {
                idUser: +option.id,
                idRoom: +this.state.idRoom
            };
        });

        let token = localStorage.getItem('token');

        this.setState({
            isLoading: true
        });

        const create = await axios({
            method: 'POST',
            url: `http://localhost:8001/contract/create?token=${token || ''}&userId=${this.state.idUser}`,
            data: {
                idRoom: +this.state.idRoom,
                idOwner: +this.state.idUser,
                idSlave: +this.state.idSlave,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                circlePay: +value.circlePay,
                deposit: +value.deposit,
                dayPay: +value.dayPay,
                note: this.state.note,
                idBlock: +this.props.block.id,
                userRooms: userRoom
            }
        });

        if (create) {
            if (create.data && create.data.data) {
                toast.success('Thêm hợp đồng thành công !');
                
                this.setState({
                    isOpenModal: !this.state.isOpenModal,
                    optionCustomers: []
                });

                this.getContracts();
            } else {
                toast.error('Thêm hợp đồng thất bại !');
            }
        }

        this.setState({isLoading: false});
    }

    onChangeSelectRoom = value =>{
        this.setState({
            idRoom : value
        });
    }

    onChangeSelectSlave = value =>{
        this.setState({
            idSlave : value
        });
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

    onChangeSelected = (e) => {
        const {value} = e.target;

        this.setState({
            room: value
        });
    }

    handleChange = (nextTargetKeys, direction, moveKeys) => {
        this.setState({targetKeys: nextTargetKeys});

        // console.log('targetKeys: ', nextTargetKeys);
        // console.log('direction: ', direction);
        // console.log('moveKeys: ', moveKeys);
    };

    handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        this.setState({selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys]});

        // console.log('sourceSelectedKeys: ', sourceSelectedKeys);
        // console.log('targetSelectedKeys: ', targetSelectedKeys);
    };

    handleScroll = (direction, e) => {
        // console.log('direction:', direction);
        // console.log('target:', e.target);
    };

    onChangeInputNumber = (value) => {
        this.setState({
            deposit: value.deposit,
            dayPay : value.dayPay

        });
    }

    onChangeTextArea = ({target: {value}}) => {
        this.setState({note : value});
    };

    onChangeRangeDate = (value) => {
        this.setState({
            startDate: moment(value[0]).format('YYYY-MM-DD'),
            endDate: moment(value[1]).format('YYYY-MM-DD')
        });   
    }

    render() {
        return (
            <div style={{position: 'relative'}}>   
                {this.state.isLoadingForm ?  <Spin /> : null}       
                <div className="card shadow mb-4">
                    <div className="card-header py-3 row" style = {{display : 'flex', alignItems : 'center', justifyContent : 'space-between'}}>
                        <div className="sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">QUẢN LÝ DANH SÁCH HỢP ĐỒNG</h6>                          
                        </div>
                        <div>
                            <Button outline color="primary" onClick = {this.addContractModal}>Thêm hợp đồng</Button>{' '}                                 
                        </div>
                                   
                    </div>
                    
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <th>Tên phòng</th>
                                        <th>Người đại diện</th>
                                        <th>Thời hạn hợp đồng</th>
                                        <th>Ngày bắt đầu</th>
                                        <th>Ngày hết hạn</th>
                                        <th>Tiền đặt cọc</th>
                                        <tr />
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderContracts()}                      
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>       
                <Modal isOpen={this.state.isOpenModal} toggle={this.toggle} className='modal-contract'>
                    {this.state.isLoading ?  <Spin /> : null}       
                    <ModalHeader toggle={this.toggle}>THÊM HỢP ĐỒNG</ModalHeader>
                    <ModalBody>
                        <Form {...layout} ref={this.formRef} onFinish={this.onFinish} >
                            <Form.Item
                                name="nameBlock"
                                label="Khu trọ/căn hộ"
                            >
                                <strong>{this.props.block && this.props.block.nameBlock}</strong>
                            </Form.Item>
                            <Divider />
                            <Form.Item
                                label="Chọn phòng"
                                name="room"
                                rules={[{required: true, message: 'Hãy chọn phòng'}]}
                            >
                                <Select
                                    placeholder="Chọn phòng"
                                    style={{width: 200}}
                                    onChange={this.onChangeSelectRoom}
                                >
                                    {this.state.rooms.map(room => (
                                        <Option key={room.id}>{room.nameRoom}</Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item style={{width: 500}}>
                                <Label>Chọn khách hàng</Label>
                                <Transfer
                                    dataSource={this.state.customers}
                                    titles={['Khách hàng', 'Khách hàng đã chọn']}
                                    targetKeys={this.state.targetKeys}
                                    selectedKeys={this.state.selectedKeys}
                                    onChange={this.handleChange}
                                    onSelectChange={this.handleSelectChange}
                                    onScroll={this.handleScroll}
                                    render={item => item.fullName}
                                    disabled={false}
                                    listStyle={{
                                        width: 300,
                                        height: 300
                                    }}
                                />
                            </Form.Item>

                            <Row>
                                <Col>
                                    <Form.Item
                                        label="Chọn người đại diện"
                                        name="room"
                                        rules={[{required: true, message: 'Hãy chọn người đại diện'}]}
                                    >
                                        <Select
                                            placeholder="Chọn người đại diện"
                                            style={{width: 200}}
                                            onChange={this.onChangeSelectSlave}
                                        >
                                            {
                                                this.state.optionCustomers.length > 0 && this.state.optionCustomers.map(customer => {
                                                    return (
                                                        <Option key={customer.id} value={customer.id}>
                                                            {customer.fullName}
                                                        </Option>
                                                    );
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <Form.Item
                                        label="Ghi chú"
                                        name="note">
                                        <TextArea
                                            value={this.state.note}
                                            onChange={this.onChangeTextArea}
                                            placeholder="Ghi chú"
                                            autoSize={{minRows: 3, maxRows: 5}}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item
                                label="Tiền đặt cọc"
                                name="deposit"
                                rules={[{required: true, message: 'Hãy nhập tiền đặt cọc'}]}
                            >
                                <InputNumber
                                    style={{width: 200}}
                                    defaultValue={0}
                                    min={0}
                                    formatter={value => `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/đ\s?|(,*)/g, '')}
                                    onChange={this.onChangeInputNumber}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Ngày bắt đầu và kết thúc hợp đồng"
                                name="startDate"
                                rules={[{required: true, message: 'Hãy chọn ngày bắt đầu và kết thúc hợp đồng'}]}
                            >
                                <RangePicker
                                    ranges={{
                                        'Hôm nay': [moment(), moment()],
                                        'Tháng này': [moment().startOf('month'), moment().endOf('month')]
                                    }}
                                    format='DD/MM/YYYY'
                                    onChange={this.onChangeRangeDate}
                                />
                            </Form.Item>

                            <Row>
                                <Col>
                                    <Form.Item
                                        label="Kì thành toán"
                                        name="circlePay"
                                        rules={[{required: true, message: 'Hãy nhập kì thanh toán'}]}
                                    >
                                        <Input addonAfter=" Tháng / Lần" style={{width: 200}} type="number" />
                                    </Form.Item>
                                </Col>

                                <Col>
                                    <Form.Item
                                        label="Ngày đóng hạn kì tới"
                                        name="dayPay"
                                        rules={[{required: true, message: 'Hãy nhập ngày đóng hạn kì tới'}]}
                                    >
                                        <InputNumber
                                            style={{width: 200}}
                                            min={0}
                                            max ={31}
                                            onChange={this.onChangeInputNumber}
                                        />
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
