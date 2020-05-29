import React, {Component} from 'react';
import {Spinner} from 'reactstrap';

export default class Spin extends Component {
    render() {
        return (
            <div className='spinner'>
                <Spinner color = "primary" />
            </div>
        );
    }
}
