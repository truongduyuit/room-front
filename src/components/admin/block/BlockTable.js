import React, {Component} from 'react';
import axios from 'axios';
import BlockRow from './BlockRow';
import {connect} from 'react-redux';
import {GET_BLOCKS} from '../../../actions//BlockActions';
import {Button} from 'reactstrap';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Form, FormGroup, Label, Input} from 'reactstrap';
import {toast, ToastContainer} from 'react-toastify';
import Spin from '../../admin/Spin';

class RoomTable extends Component {

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
        this.getRooms();
    }

    getRooms = async () =>{
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
                toast.success('Thêm khu trọ thành công !');

                this.setState({
                    isOpenModal: !this.state.isOpenModal
                });
                this.getRooms();
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
            this.getRooms();
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
                        <Form>
                            <FormGroup>
                                <Label for="exampleNameBlock">Tên khu trọ</Label>
                                <Input type="email" name="nameBlock" id="exampleNameBlock" onChange={(e) => this.onChange(e)} value={this.state.nameBlock} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleAddress">Địa chỉ</Label>
                                <Input type="email" name="address" id="exampleAddress" onChange={(e) => this.onChange(e)} value={this.state.address} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleDescription">Mô tả</Label>
                                <Input type="email" name="description" id="exampleDescription" onChange={(e) => this.onChange(e)} value={this.state.description} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onAdding}>Thêm</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Hủy</Button>
                    </ModalFooter>
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

export default connect(mapStateToProps, mapDispatchToProps)(RoomTable);