import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <Link to="/" ><div className="logo" /></Link>
                <div className="support">17520388@gm.uit.edu.vn</div>
                <div>Designed by <a hred="https://www.facebook.com/truongduyuit/">@Chung Nguyễn trường Duy</a></div>
            </div>
        );
    }
}
