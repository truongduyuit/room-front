import React, {Component} from 'react';

import SideBar from '../SideBar';
import Topbar from '../Topbar';
import Spin from '../../admin/Spin';
import CustomerTable from './CustomerTable';
import LogoutModal from '../LogoutModal';

import axios from 'axios';
import {Container, Row, Col} from 'reactstrap';
import {FormGroup, Label, Input} from 'reactstrap';
import {Link} from 'react-router-dom';

export default class Index extends Component {

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

                if (blocks.length > 0)
                {
                    this.setState({
                        blocks,
                        idBlockSelected: blocks[0].id,
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

    // onChangeSelected = (e) => {
    //     const {value} = e.target;

    //     if (value) {
    //         const block = this.state.blocks.find(block => block.nameBlock === value);

    //         this.setState({
    //             idBlockSelected: +block.id,
    //             block
    //         });
    //     }
    // }

    renderSelectBlock = () =>{

        if (Array.isArray(this.state.blocks) && this.state.blocks.length > 0) {
            return this.state.blocks.map(block => {
                return <React.Fragment key={block.id}>
                    <option onClick={() => this.onClickBlock(block.id)}>{block.nameBlock}</option>
                </React.Fragment>;
            });
        }
    }

    render() {
        return (
            <div>
                {this.state.isLoading ?  <Spin /> : null} 
                <div className="container-fluid">
                    <CustomerTable idBlock={this.state.idBlockSelected} block= {this.state.block} />
                </div>
            </div>
        );
    }
}
