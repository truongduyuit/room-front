// Libraries
import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import {toast, ToastContainer} from 'react-toastify';
import {Form, Button, Checkbox, Row, Col, Divider} from 'antd';

// Actions
import {GET_ROOMS} from '../../../actions/RoomAction';

// Components
import Spin from '../../admin/Spin';
import ServiceRow from './ServiceRow';

const layout = {
    labelCol: {
        span: 24
    },
    wrapperCol: {
        span: 24
    }
};

class ServiceTable extends Component {
    formRef = React.createRef();

    state = {
        services: [],
        defaultServices: [],
        isOpenModal: false,
        isLoading: false,
        isLoadingForm: false,
        units: []
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
            this.getServices();

            this.getDefaultServices();
        }
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

    getDefaultServices = async () =>{
        this.setState({
            isLoading: true
        });

        let token = localStorage.getItem('token');
        const getDefaultServices = await axios({
            url: `http://localhost:8001/default-service/get-default-services?token=${token || ''}`,
            method: 'GET'
        });

        if (getDefaultServices) {
            if (getDefaultServices.data && getDefaultServices.data.data) {
                const {defaultServices = []} = getDefaultServices.data.data;

                this.setState({
                    defaultServices
                });
            } 
        }
        this.setState({isLoading: false});
    }

    addServiceModal = () =>{
        this.setState({
            isOpenModal: true,
            isLoading: false
        });
    }

    callBackServiceRow = (value) =>{
        if (value) {
            this.getServices();
        }
    }

    callBackRoomRow = value =>{
        if (value) {
            this.getServices();
        }
    }

    renderService = () => {
        const {services = []} = this.state;

        if (Array.isArray(services) && services.length > 0) {
            return services.map(service => {
                return <React.Fragment key={service.id}>
                    <ServiceRow 
                        service={service}
                        callback = {this.callBackServiceRow}
                        block= {this.props.block}
                    />
                </React.Fragment>;
            });
        }
    }

    renderDefaultServices = () => {
        const newServices = this.state.defaultServices.filter(service => {
            if (this.state.services)
            {
                if (!this.state.services.some(bservice => bservice.nameService === service.nameService)) {
                    return service;
                }
            }
        });

        console.log(this.state.services);
        return <Checkbox.Group style={{width: '100%'}}>
            <Row>
                {
                    newServices.length > 0 ?
                        newServices.map(service => {
                            return (
                                <Col span={8} key={service.id}>
                                    <Checkbox value={service.id} style={{lineHeight: '32px'}}>
                                        {service.nameService}
                                    </Checkbox>
                                </Col>
                            );
                        }) : 'Không có dịch vụ nào hiện tại'
                }
            </Row>
        </Checkbox.Group>;
    }

    onFinish = (value) => {
        const {services = []} = value;

        if (services.length > 0 ) {
            const newServices = this.state.defaultServices.filter(dService =>(services.some(service => service === dService.id))).map(dService => ({
                nameService: dService.nameService,
                price: dService.price,
                idUnit: dService.idUnit,
                description: dService.description,
                idBlock: this.props.block.id
            }));

            this.createServices(newServices);
        }
    }

    createServices = async (services) => {
        let token = localStorage.getItem('token');

        this.setState({
            isLoading: true
        });

        const create = await axios({
            method: 'POST',
            url: `http://localhost:8001/service/create?token=${token || ''}`,
            data: {
                services
            }
        });

        if (create) {
            if (create.data && create.data) {
                toast.success('Thêm dịch vụ thành công !');

                this.setState({
                    isOpenModal: !this.state.isOpenModal
                });

                this.getServices();
            } else {
                toast.error('Thêm dịch vụ thất bại !');
            }
        }

        this.setState({isLoading: false});
    }

    render() {
        return (
            <div style={{position: 'relative'}}>   
                {this.state.isLoadingForm ?  <Spin /> : null}       
                <div className="card shadow mb-4">
                    <div className="card-header py-3 row" style = {{display : 'flex', alignItems : 'center', justifyContent : 'space-between'}}>
                        <div className="sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">QUẢN LÝ DANH SÁCH DỊCH VỤ</h6>                          
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
                                        <th>Tên dịch vụ</th>
                                        <th>Đơn giá</th>
                                        <th>Đơn vị</th>
                                        <th>Mô tả</th>

                                        <tr />
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderService()}                      
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>       
                <Modal isOpen={this.state.isOpenModal} toggle={this.toggle}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ServiceTable);