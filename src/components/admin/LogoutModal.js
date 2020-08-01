import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class LogoutModal extends Component {

    logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    render() {
        return (
            <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Đăng xuất?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">Đăng xuất để thoát khỏi phiên làm việc</div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Hủy</button>
                            <Link onClick={this.logOut} className="btn btn-primary" to="/dang-nhap">Đăng xuất</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
