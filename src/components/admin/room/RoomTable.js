import React, { Component } from 'react';

class RoomTable extends Component {
    render() {
        return (
            <React.Fragment>              
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">QUẢN LÝ DANH SÁCH NHÀ TRỌ</h6>
                    </div>
                    <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                        <thead>
                            <tr>
                            <th>Tên khu nhà</th>
                            <th>Địa chỉ</th>
                            <th>Mô tả</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>A3</td>
                            <td>KTX Khu A - ĐHQG HCM</td>
                            <td>To nhất quả đất</td>
                            <td>
                                <button className="btn btn-warning btn-circle mr-3" title="Chỉnh sửa">
                                    <i class="fa fa-pencil-square" aria-hidden="true"></i>  
                                </button>
                                <button className="btn btn-danger btn-circle" title="Xóa">
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                </button>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>       
            
            </React.Fragment>
        );
    }
}

export default RoomTable;