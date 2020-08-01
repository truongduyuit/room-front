import React, {Component} from 'react';
import '../../../assets/css/sb-admin-2.min.css';
import '../../../assets/vendor/datatables/dataTables.bootstrap4.min.css';
import SideBar from '../SideBar';
import Topbar from '../Topbar';
import ContractTable from './ContractTable';
import LogoutModal from '../LogoutModal';
import {FormGroup, Label, Input} from 'reactstrap';
import {Container, Row, Col} from 'reactstrap';
import axios from 'axios';
import Spin from '../../admin/Spin';

export default class Index extends Component {

    state = {
        blocks: [],
        isLoading: false,
        idBlockSelected: null,
        block: null,
        customers: []
    }

    componentDidMount() {
        this.getBlocks();
        this.getCustomers();
    }

    getBlocks = async () =>{
        this.setState({
            isLoading: true
        });

        let user = JSON.parse(localStorage.getItem('user'));
        let token = localStorage.getItem('token');
        const getBlocks = await axios({
            url: `http://localhost:8001/block/get-block?token=${token || ''}&userId=${user ? user.id : ''}`,
            method: 'GET'
        });
        
        if (getBlocks) {
            if (getBlocks.data && getBlocks.data.data) {
                const {blocks = []} = getBlocks.data.data;

                if (blocks.length > 0)
                {
                    this.setState({
                        blocks,
                        idBlockSelected: +blocks[0].id,
                        isLoading: false,
                        block: blocks[0]
                    });
                }
            }
        }

        this.setState({
            isLoading: false
        });
    }

    onClickBlock = (id) => {
        if (id) {
            this.setState({
                idBlockSelected: +id
            });
        }
    }
    
    renderSelectBlock = () =>{

        if (Array.isArray(this.state.blocks) && this.state.blocks.length > 0) {
            return this.state.blocks.map(block => {
                return <React.Fragment key={block.id}>
                    <option onClick={() => this.onClickBlock(block.id)}>{block.nameBlock}</option>
                </React.Fragment>;
            });
        }
    }

    onChangeSelected = (e) => {
        const {value} = e.target;

        if (value) {
            const block = this.state.blocks.find(block => block.nameBlock === value);

            this.setState({
                idBlockSelected: block.id,
                block
            });
        }
    }

    getCustomers = async () =>{
        this.setState({
            isLoadingForm: true
        });

        let user = JSON.parse(localStorage.getItem('user'));
        let token = localStorage.getItem('token');
        const getCustomers = await axios({
            url: `http://localhost:8001/customer/get-customers?token=${token || ''}&userId=${user.id || ''}&page=${1}&limit=${1000}`,
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
            <div>
                {this.state.isLoading ?  <Spin /> : null} 
                <div className="container-fluid">
                    <Container>
                        <Row>
                            <Col />
                            <Col xs="6" sm = "4">
                                <FormGroup>
                                    <Label for="exampleSelect">Khu trọ</Label>
                                    <Input onChange={this.onChangeSelected} type="select" name="select" id="exampleSelect">
                                        {this.renderSelectBlock()}
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Container>
                    <ContractTable idBlock={this.state.idBlockSelected} block= {this.state.block} customers = {this.state.customers} />
                </div>
            </div>

        );
    }
}
