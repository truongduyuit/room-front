import React, {Component} from 'react';
import {Form, Input, Radio , Button, Checkbox, Row, Col, Divider, DatePicker, Upload, message} from 'antd';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import axios from 'axios';
import Spin from '../../admin/Spin';
import {toast, ToastContainer} from 'react-toastify';
import moment from 'moment';

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

export default class CustomerRow extends Component {
    formRef = React.createRef();

    state = {
        customers: [],
        isOpenModal: false,
        isOpenDeleteModal: false,
        isLoading: false,
        isLoadingForm: false,
        loading: false,
        tempReg : false
    }

    onChangeTempReg = () =>{
        this.setState({
            tempReg: !this.state.tempReg
        });
    }

    toggle = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        });
    }

    onClickEdit = () => {
        this.setState({
            isOpenModal: true,
            tempReg : this.props.customer.tempReg
        });
    }

    toggleDelete = () =>{
        this.setState({
            isOpenDeleteModal: !this.state.isOpenDeleteModal
        });
    }

    onClickDelete = () => {
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
            url: `http://localhost:8001/customer/delete/${this.props.customer.id}?token=${token || ''}`,
            method: 'DELETE'
        });

        this.setState({
            isLoading: false
        });

        if (result) {
            if (result.data && result.data.data) {
                toast.success('Xóa khách hàng thành công !');
               
                this.props.callback(true);

                this.setState({
                    isOpenDeleteModal: !this.state.isOpenDeleteModal
                });
            } else {

                toast.error('Xóa khách hàng thất bại !');
            }
        } 
    }

    onFinish = async (value) => {
        let user = JSON.parse(localStorage.getItem('user'));
        let token = localStorage.getItem('token');

        this.setState({
            isLoading: true
        });

        const result = await axios({
            url: `http://localhost:8001/customer/update/${this.props.customer.id}?token=${token || ''}&userId=${user.id}`,
            method: 'PUT',
            data: {
                id : this.props.customer.id,
                fullName : value.fullName,
                phoneNumber : value.phoneNumber,
                dateBirth : moment(value.dateBirth).format('YYYY-MM-DD'),
                email : value.email ? value.email : '',
                job : value.job,
                workPlace: value.workPlace ? value.workPlace : '',
                sex : value.sex,
                tempReg: this.state.tempReg ? 1 : 0,
                note : value.note ? value.note : '',
                avatar: '',
                identifyBack: '',
                identifyFront: ''
            }
        });

        this.setState({
            isLoading: false
        });

        if (result) {
            if (result.data && result.data.data) {
                toast.success('Cập nhật khách hàng thành công !');

                this.setState({
                    isOpenModal: !this.state.isOpenModal
                });
                this.props.callback(true);
            } else {

                toast.error('Cập nhật khách hàng thất bại !');
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <tr>
                    <td>{this.props.customer.fullName}</td>
                    <td>{this.props.customer.phoneNumber}</td>
                    <td>{this.props.customer.status === 1 ? 'Đã thuê' : 'Chưa thuê'}</td>
                    <td>{this.props.customer.roomName}</td>
                    <td>
                        <button onClick={this.onClickEdit} className="btn btn-warning btn-circle mr-3" title="Chỉnh sửa">
                            <i className="fa fa-pencil-square" aria-hidden="true" />
                        </button>
                        <button onClick={this.onClickDelete} className="btn btn-danger btn-circle" title="Xóa">
                            <i className="fa fa-trash" aria-hidden="true" />
                        </button>
                    </td>
                </tr>

                <Modal isOpen={this.state.isOpenModal} toggle={this.toggle}>
                    {this.state.isLoading ?  <Spin /> : null}       
                    <ModalHeader toggle={this.toggle}>CHỈNH SỬA THÔNG TIN KHÁCH HÀNG</ModalHeader>
                    <ModalBody>
                        <Form 
                            {...layout} 
                            initialValues={{
                                sex: this.props.customer.sex,
                                job: this.props.customer.job,
                                fullName: this.props.customer.fullName,
                                email: this.props.customer.email,
                                phoneNumber : this.props.customer.phoneNumber,
                                workPlace : this.props.customer.workPlace,
                                dateBirth : moment(this.props.customer.dateBirth),
                                note : this.props.customer.note
                            }} 
                            ref={this.formRef} onFinish={this.onFinish}>
                            <Form.Item
                                name="nameBlock"
                                label="Khu trọ/căn hộ"
                            >
                                <strong>{this.props.block && this.props.block.nameBlock}</strong>
                            </Form.Item>
                            <Divider />
                            <Form.Item
                                {...formItemLayout}
                                name="fullName"
                                label="Tên khách hàng:"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập tên khách hàng'
                                    }
                                ]}
                            >
                                <Input placeholder="Hãy nhập tên khách hàng" />
                            </Form.Item>
                            <Form.Item 
                                {...formItemLayout}
                                name="email"
                                label="Email" 
                                rules={[{type: 'email'}]}>
                                <Input placeholder="abc@gmail.com" />
                            </Form.Item>

                            <Row>
                                <Col span={24}>
                                    <Form.Item >
                                        <Form.Item 
                                            {...formItemLayout}
                                            name = 'phoneNumber'
                                            label="Số diện thoại"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Hãy nhập số điện thoại'
                                                }
                                            ]}
                                        >
                                            <Input placeholder= '0xxx' />
                                        </Form.Item>
                                        <Form.Item 
                                            name="dateBirth" 
                                            label="Ngày sinh" 
                                            {...formItemLayout}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Hãy chọn ngày sinh'
                                                }
                                            ]}
                                        >
                                            <DatePicker />
                                        </Form.Item>
                                        <Form.Item 
                                            name="job" 
                                            label="Nghề nghiệp" 
                                            {...formItemLayout}
                                        >
                                            <Radio.Group onChange={this.onChange} value={this.state.job}>
                                                <Radio value={'Sinh viên'}>Sinh Viên</Radio>
                                                <Radio value={'Người đi làm'}>Người đi làm</Radio>
                                            </Radio.Group>
                                        </Form.Item>

                                        <Form.Item 
                                            {...formItemLayout}
                                            name = 'workPlace'
                                            label="Nơi công tác"
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item 
                                            name="sex" 
                                            label="Giới tính" 
                                            {...formItemLayout}
                                        >
                                            <Radio.Group onChange={this.onChange}>
                                                <Radio value={'Nam'}>Nam</Radio>
                                                <Radio value={'Nữ'}>Nữ</Radio>
                                                <Radio value={'Khác'}>Khác</Radio>
                                            </Radio.Group>
                                        </Form.Item>

                                        <Form.Item 
                                            {...formItemLayout}
                                            name = 'tempRegBool'
                                            label="Đăng ký tạm trú"
                                        >
                                            <Checkbox checked={this.state.tempReg} onChange={this.onChangeTempReg}>Đăng ký</Checkbox>
                                        </Form.Item>

                                        <Form.Item 
                                            {...formItemLayout}
                                            name = 'note'
                                            label="Ghi chú"
                                        >
                                            <TextArea placeholder="textarea with clear icon" allowClear onChange={this.onChange} />
                                        </Form.Item>

                                    </Form.Item>
                                    
                                </Col>
                            </Row>

                            <Form.Item
                                wrapperCol={{
                                    md: {span: 8, offset: 16}
                                }}
                            >
                                <Button htmlType='submit' type='primary' >Cập nhật</Button>{' '}
                                <Button  onClick={this.toggle}>Hủy</Button>
                            </Form.Item>
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isOpenDeleteModal} toggle={this.toggle}>
                    {this.state.isLoading ?  <Spin /> : null}  
                    <ModalHeader toggle={this.toggle}>THÔNG BÁO</ModalHeader>
                    <ModalBody>
                        Chắc chắn muốn xóa khách hàng {this.props.customer.fullName} ?
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
