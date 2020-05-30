import React, {Component} from 'react';

export default class LogoutModal extends Component {
    render() {
        return (
            <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">Đăng suất để thoái khỏi phiên làm việc</div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Hủy</button>
                            <a className="btn btn-primary" href="login.html">Đăng suất</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
