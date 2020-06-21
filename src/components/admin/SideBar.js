import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SideBar extends Component {
    render() {
        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink" />
                    </div>
                    <div className="sidebar-brand-text mx-3">H.D.V Smart <sup>motel</sup></div>
                </Link>
                <hr className="sidebar-divider my-0" />
                {/* Nav Item - Dashboard */}
                <li className="nav-item active">
                    <Link className="nav-link" to="/admin">
                        <i className="fas fa-fw fa-tachometer-alt" />
                        <span>Dashboard</span></Link>
                </li>
                {/* Nav Item - Pages Collapse Menu */}

                <li className="nav-item">
                    <Link className="nav-link" to="/admin/khu-tro">
                        <i className="fas fa-fw fa-chart-area" />
                        <span>Khu trọ</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/admin/phong">
                        <i className="fas fa-fw fa-chart-area" />
                        <span>Phòng</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/admin/dich-vu">
                        <i className="fas fa-fw fa-chart-area" />
                        <span>Dịch vụ</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/admin/khach-hang">
                        <i className="fas fa-fw fa-chart-area" />
                        <span>Khách hàng</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/admin/hop-dong">
                        <i className="fas fa-fw fa-chart-area" />
                        <span>Hợp đồng</span></Link>
                </li>
            </ul>
        );
    }
}

export default SideBar;