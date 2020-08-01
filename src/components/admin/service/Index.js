import React, {Component} from 'react';
import '../../../assets/css/sb-admin-2.min.css';
import '../../../assets/vendor/datatables/dataTables.bootstrap4.min.css';
import {connect} from 'react-redux';
import SideBar from '../SideBar';
import Topbar from '../Topbar';
import ServiceTable from './ServiceTable';
import LogoutModal from '../LogoutModal';
import {FormGroup, Label, Input} from 'reactstrap';
import {Container, Row, Col} from 'reactstrap';
import axios from 'axios';
import Spin from '../../admin/Spin';

class Index extends Component {

    state = {
        blocks: [],
        isLoading: false,
        idBlockSelected: null,
        block: null
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
        const getBlocks = await axios({
            url: `http://localhost:8001/block/get-block?token=${token || ''}&userId=${user ? user.id : ''}`,
            method: 'GET'
        });
        
        if (getBlocks) {
            if (getBlocks.data && getBlocks.data.data) {
                const {blocks = []} = getBlocks.data.data;
                
                if (blocks.length > 0) {
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
                    <ServiceTable idBlock={this.state.idBlockSelected} block= {this.state.block} />
                </div>
            </div>

        );
    }
}

const mapStateToProps = state=> {
    return {
        blocksState: state.BlockReducer.blocks
    };
};

export default connect(mapStateToProps, null)(Index);