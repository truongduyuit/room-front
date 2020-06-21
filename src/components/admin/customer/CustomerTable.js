import React, {Component} from 'react';
import axios from 'axios';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import {toast, ToastContainer} from 'react-toastify';
import {Form, Input, Radio , Button, Checkbox, Row, Col, Divider, DatePicker, Upload, message} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import moment from 'moment';

// Components
import Spin from '../../admin/Spin';
import CustomerRow from './CustomerRow';

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

const formItem1P2Layout = {
    labelCol: {span: 6},
    wrapperCol: {span: 6}
};

function getBase64(img, callback) {
    const reader = new FileReader();

    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class CustomerTable extends Component {
    formRef = React.createRef();

    state = {
        customers: [],
        isOpenModal: false,
        isLoading: false,
        isLoadingForm: false,
        loading: false,

        email: '',
        job : 'Sinh viên',
        sex : 'Nam',
        tempReg: false,
        checked: false,
        disabled: false,
        note: '',
        avatar: ''
    }

    callBackCustomerRow = value =>{
        if (value) {
            this.getCustomers();
        }
    }

    renderCustomer = () =>{
        const {customers = []} = this.state;

        if (Array.isArray(customers) && customers.length > 0) {
            
            return customers.map(customer => {
                return <React.Fragment key={customer.id}>                   
                    <CustomerRow 
                        customer={customer}
                        callback = {this.callBackCustomerRow}
                        block= {this.props.block}
                    />
                </React.Fragment>;
            });
        }
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

    openAddCustomerModal = () =>{
        this.setState({
            isOpenModal: true
        });
    }

    toggle = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        });
    }

    onFinish = async (value) => {
        let user = JSON.parse(localStorage.getItem('user'));
        let timeStamp = `#${Math.floor(Date.now() / 1000)}`;
        let token = localStorage.getItem('token');

        this.setState({
            isLoading: true
        });

        const result = await axios({
            url: `http://localhost:8001/customer/create?token=${token || ''}&userId=${user.id}`,
            method: 'POST',
            data: {
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
                identifyFront: '',
                codeUser: timeStamp,
                IdOwner : user.id
            }
        });

        this.setState({
            isLoading: false
        });

        if (result) {
            if (result.data && result.data.data) {
                toast.success('Thêm khách hàng thành công !');

                this.setState({
                    isOpenModal: !this.state.isOpenModal
                });
                this.getCustomers();
            } else {

                toast.error('Thêm khách hàng thất bại !');
            }
        }
    }

    onChange = (e) => {
        this.setState({
            value: e.target.value
        });
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false
                })
            );
        }
    }

    onChangeTempReg = () => {
        this.setState({
            tempReg: !this.state.tempReg
        });
    }

    render() {

        const {idBlock} = this.props;

        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const {avatar} = this.state;

        return (
            <div style={{position: 'relative'}}>   
                {this.state.isLoadingForm ?  <Spin /> : null}       
                <div className="card shadow mb-4">
                    <div className="card-header py-3 row" style = {{display : 'flex', alignItems : 'center', justifyContent : 'space-between'}}>
                        <div className="sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">QUẢN LÝ KHÁCH HÀNG</h6>                          
                        </div>
                        <div>
                            <Button 
                                outline color= {idBlock === null ? 'secondary' : 'primary' }
                                disabled={idBlock === null ? true : false}
                                title = {idBlock === null ? 'Phải có ít nhất 1 khu trọ để thực hiện thêm khách hàng' : ''}
                                onClick = {this.openAddCustomerModal}
                            >Thêm khách hàng</Button>{' '}                                 
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
                                        {/* <th>Đại diện phòng</th> */}
                                        <tr />
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderCustomer()}                      
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>       
                <Modal isOpen={this.state.isOpenModal} toggle={this.toggle}>
                    {this.state.isLoading ?  <Spin /> : null}       
                    <ModalHeader toggle={this.toggle}>THÊM KHÁCH HÀNG</ModalHeader>
                    <ModalBody>
                        <Form 
                            {...layout} 
                            initialValues={{
                                sex: 'Nam',
                                job: 'Sinh viên'
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
                                // name={['user', 'email']} 
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

                                        {/* <Form.Item 
                                            {...formItemLayout}
                                            name = 'avatar'
                                            label="Ảnh đại diện"
                                        >
                                            <Upload
                                                name="avatar"
                                                listType="picture-card"
                                                className="avatar-uploader"
                                                showUploadList={false}
                                                action="http://localhost:8001/upload/userAvatar"
                                                beforeUpload={beforeUpload}
                                                onChange={this.handleChange}
                                            >
                                                {avatar ? <img src={avatar} alt="avatar" style={{width: '100%'}} /> : uploadButton}
                                            </Upload>
                                        </Form.Item> */}
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

export default CustomerTable;
