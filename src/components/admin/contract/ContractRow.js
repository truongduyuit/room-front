import React, {Component} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter , Label, Row, Col} from 'reactstrap';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import Spin from '../../admin/Spin';
import _ from 'lodash';
import moment from 'moment';
import {Form, Button, Input, Select, Divider, Transfer, InputNumber, DatePicker, Tag} from 'antd';

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

export default class ContractRow extends Component {

    formRef = React.createRef();

    state = {
        isOpenModal: false,
        isOpenDeleteModal: false,
        isLoading: false,
        targetKeys: [],
        optionCustomers: [],
        customers: [],
        selectedKeys: [],
        startDate: '',
        endDate: '',
        note: '',
        idSlave: null
    }

    componentDidMount() {
        this.setState({
            note : this.props.contract.note
        });

        const newCustomers = this.props.customers.map(customer => ({
            ...customer,
            key: customer.id
        }));

        const newOptionCustomers = this.props.customers.filter(customer => {
            if (this.props.contract.idUsers.some(user => user === customer.id)) {
                return customer;
            }
        });

        this.setState({
            customers: newCustomers,
            targetKeys: this.props.contract.idUsers,
            optionCustomers: newOptionCustomers
        });

        this.setState({
            idSlave : this.props.contract.idSlave
        });

    }

    handleChange = (nextTargetKeys, direction, moveKeys) => {
        const newOptionCustomers = this.props.customers.filter(customer => {
            if (nextTargetKeys.some(key => key === customer.id)) {
                return customer;
            }
        });
        
        this.setState({targetKeys: nextTargetKeys, optionCustomers: newOptionCustomers});

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

    checksSelectedKey = (arr, val) => {
        return arr.some(arrVal => {
            return val === arrVal;
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
            url: `http://localhost:8001/contract/delete/${this.props.contract.id}?token=${token || ''}`,
            method: 'DELETE'
        });

        this.setState({
            isLoading: false
        });

        if (result) {
            if (result.data && result.data.data) {
                toast.success('Xóa hợp đồng thành công !');
               
                this.props.callback(true);

                let {idUsers = []} = this.props.contract;

                this.onDeletingUserRoom(idUsers);

                this.setState({
                    isOpenDeleteModal: !this.state.isOpenDeleteModal
                });
            } else {

                toast.error('Xóa hợp đồng thất bại !');
            }
        } 
        
    }

    onDeletingUserRoom = async ids =>{
        let token = localStorage.getItem('token');

        await axios({
            url: `http://localhost:8001/user-room/delete-all?token=${token || ''}`,
            method: 'POST',
            data: {
                idUserRooms: ids
            } 
        });
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

    onChangeInputNumber = (value) => {
        this.setState({
            deposit: value.deposit,
            dayPay : value.dayPay

        });
    }

    onChangeRangeDate = (value) => {
        this.setState({
            startDate: moment(value[0]).format('YYYY-MM-DD'),
            endDate: moment(value[1]).format('YYYY-MM-DD')
        });   
    }

    onChangeTextArea = ({target: {value}}) => {
        this.setState({note : value});
    };

    onChangeSelectSlave = value =>{
        this.setState({
            idSlave : value
        });
    }

    onFinish = async (value) => {

        const {contract} = this.props;

        const userRoom = this.state.optionCustomers.map(option => {
            return {
                idUser: +option.id,
                idRoom: +contract.idRoom
            };
        });

        let token = localStorage.getItem('token');

        this.setState({
            isLoading: true
        });

        const update = await axios({
            method: 'PUT',
            url: `http://localhost:8001/contract/update/${contract.id}?token=${token || ''}`,
            data: {
                idRoom: +contract.idRoom,
                idOwner: +contract.idOwner,
                idSlave: +this.state.idSlave,
                startDate: moment(value.startDate[0]).format('YYYY-MM-DD'),
                endDate: moment(value.startDate[1]).format('YYYY-MM-DD'),
                circlePay: +value.circlePay,
                deposit: +value.deposit,
                dayPay: +value.dayPay,
                note: this.state.note,
                idBlock: +contract.idBlock,
                userRooms: userRoom
            }
        });

        if (update) {
            if (update.data && update.data.data) {
                toast.success('Cập nhật hợp đồng thành công !');
                
                this.setState({
                    isOpenModal: !this.state.isOpenModal
                });
                
                console.log(update);
                this.props.callback(true);
            } else {
                toast.error('Cập nhật hợp đồng thất bại !');
            }
        }

        this.setState({isLoading: false});
    }

    render() {
        const {contract} = this.props;

        return (
            <React.Fragment>
                <tr>
                    <td><Tag color="geekblue">{this.props.contract.nameRoom}</Tag></td>
                    <td>{this.props.contract.fullName}</td>
                    <td>{this.props.contract.circlePay} tháng</td>
                    <td>{moment(this.props.startDate).format('DD-MM-YYYY')}</td>
                    <td>{moment(this.props.endDate).format('DD-MM-YYYY')}</td>
                    <td>{this.props.contract.deposit}</td>
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
                    <ModalHeader toggle={this.toggle}>CHỈNH SỬA THÔNG TIN HỢP ĐỒNG</ModalHeader>
                    <ModalBody>
                        <Form {...layout} name="form-update" ref={this.formRef} onFinish={this.onFinish}  initialValues={{
                            startDate: [moment(contract.startDate), moment(contract.endDate)],
                            dayPay : contract.dayPay,
                            deposit : contract.deposit,
                            note : contract.note,
                            idSlave: this.props.contract.idSlave,
                            circlePay: contract.circlePay
                        }}>
                          
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
                            >
                                <Select
                                    placeholder="Tên phòng"
                                    style={{width: 200}}
                                    defaultValue= {contract.idRoom}
                                    disabled
                                >
                                    <Option value={contract.idRoom} disabled >{contract.nameRoom}</Option>
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
                                        label="Người đại diện"
                                        name="idSlave"
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
                                        <Input 
                                            addonAfter=" Tháng / Lần" 
                                            style={{width: 200}} type="number" 
                                            value = {contract.circlePay} 
                                            defaultValue = {contract.circlePay} />
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
                                <Button htmlType='submit' type='primary' >Chỉnh sửa</Button>{' '}
                                <Button  onClick={this.toggle}>Hủy</Button>
                            </Form.Item>

                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isOpenDeleteModal} toggle={this.toggle}>
                    {this.state.isLoading ?  <Spin /> : null}  
                    <ModalHeader toggle={this.toggle}>THÔNG BÁO</ModalHeader>
                    <ModalBody>
                        Chắc chắn muốn hợp đồng của phòng <b>{this.props.contract.nameRoom}</b>?
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
