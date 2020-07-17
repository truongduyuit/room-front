import React, {Component} from 'react';
import axios from 'axios';
import BlockRow from './BlockRow';
import {connect} from 'react-redux';
import {GET_BLOCKS} from '../../../actions//BlockActions';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {toast, ToastContainer} from 'react-toastify';
import Spin from '../../admin/Spin';

import {Form, Input, Button} from 'antd';

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

class BlockTable extends Component {

    state = {
        blocks : [],
        isOpenModal: false,
        nameBlock: '',
        address: '',
        description : '',
        isLoading: false
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
        this.getBlocks();
    }

    getBlocks = async () =>{
        this.setState({
            isLoading: true
        });

        let user = JSON.parse(localStorage.getItem('user'));
        let token = localStorage.getItem('token');
        const blocks = await axios({
            url: `http://localhost:8001/block/get-block?token=${token || ''}&userId=${user ? user.id : ''}`,
            method: 'GET'
        });
        
        this.setState({
            blocks : blocks.data.data.blocks,
            isLoading: false
        });

        this.props.GET_BLOCKS({
            blocks: blocks.data.data.blocks
        });

    }

    onFinish = async (values) => {
        this.setState({
            isLoading: true
        });

        let user = JSON.parse(localStorage.getItem('user'));
        let token = localStorage.getItem('token');

        const result = await axios({
            url: `http://localhost:8001/block/create?token=${token || ''}`,
            method: 'POST',
            data: {
                nameBlock : values.nameBlock,
                address : values.address,
                description : values.description,
                idOwner : user.id
            }
        });

        this.setState({
            isLoading: false
        });
        if (result) {
            if (result.data && result.data.data) {
                this.getBlocks();
                toast.success('Thêm khu trọ thành công !');

                this.setState({
                    isOpenModal: !this.state.isOpenModal
                });
                
            } else {

                toast.error('Thêm khu trọ thất bại !');
            }
        } 

    }

    onAdding = async () =>{
        this.setState({
            isLoading: true
        });

        let user = JSON.parse(localStorage.getItem('user'));
        let token = localStorage.getItem('token');

        const result = await axios({
            url: `http://localhost:8001/block/create?token=${token || ''}`,
            method: 'POST',
            data: {
                nameBlock : this.state.nameBlock,
                address : this.state.address,
                description : this.state.description,
                idOwner : user.id
            }
        });

        this.setState({
            isLoading: false
        });
        if (result) {
            if (result.data && result.data.data) {
                this.getBlocks();
                toast.success('Thêm khu trọ thành công !');

                this.setState({
                    isOpenModal: !this.state.isOpenModal
                });
                
            } else {

                toast.error('Thêm khu trọ thất bại !');
            }
        } 
    }

    addBlockModal = () =>{
        this.setState({
            isOpenModal: true
        });
    }

    callBackBlockRow = (value) =>{
        if (value) {
            this.getBlocks();
        }
    }

    renderBlock = () => {
        const {blocksState = []} = this.props;

        if (Array.isArray(blocksState) && blocksState.length > 0) {
            return blocksState.map(block => {
                return <React.Fragment key={block.id}>
                    <BlockRow 
                        block={block}
                        callback = {this.callBackBlockRow}
                    />
                </React.Fragment>;
            });
        }
    }

    render() {
        return (
            <div style={{position: 'relative'}}>   
                {this.state.isLoading ?  <Spin /> : null}       
                <div className="card shadow mb-4">
                    <div className="card-header py-3 row" style = {{display : 'flex', alignItems : 'center', justifyContent : 'space-between'}}>
                        <div className="sm-6">
                            <h6 className="m-0 font-weight-bold text-primary">QUẢN LÝ DANH SÁCH NHÀ TRỌ</h6>                          
                        </div>
                        <div>
                            <Button outline color="primary" onClick = {this.addBlockModal}>Thêm khu trọ</Button>{' '}                                 
                        </div>
                                   
                    </div>
                    
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <th>Tên khu nhà</th>
                                        <th>Địa chỉ</th>
                                        <th>Mô tả</th>
                                        <tr />
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderBlock()}                      
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>       
                <Modal isOpen={this.state.isOpenModal} toggle={this.toggle}>
                    {this.state.isLoading ?  <Spin /> : null}       
                    <ModalHeader toggle={this.toggle}>THÊM KHU TRỌ</ModalHeader>
                    <ModalBody>
                        <Form 
                            {...layout} 
                            ref={this.formRef} onFinish={this.onFinish}>
                            <Form.Item
                                {...formItemLayout}
                                name="nameBlock"
                                label="Tên khu trọ:"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập tên khu trọ'
                                    }
                                ]}
                            >
                                <Input placeholder="Nhập tên khu trọ" />
                            </Form.Item>   

                            <Form.Item
                                {...formItemLayout}
                                name="address"
                                label="Địa chỉ:"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập địa chỉ'
                                    }
                                ]}
                            >
                                <Input placeholder="Nhập địa chỉ" />
                            </Form.Item>    

                            <Form.Item
                                {...formItemLayout}
                                name="description"
                                label="Mô tả:"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập mô tả'
                                    }
                                ]}
                            >
                                <Input placeholder="Nhập mô tả" />
                            </Form.Item>  
                            
                                                

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
    GET_BLOCKS
};

const mapStateToProps = state => {
    return {
        blocksState: state.BlockReducer.blocks
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockTable);