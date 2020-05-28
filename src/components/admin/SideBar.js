import React, { Component } from 'react';

class SideBar extends Component {
    render() {
        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                <i className="fas fa-laugh-wink" />
                </div>
                <div className="sidebar-brand-text mx-3">Heaven <sup>motel</sup></div>
            </a>
            <hr className="sidebar-divider my-0" />
            {/* Nav Item - Dashboard */}
            <li className="nav-item active">
                <a className="nav-link" href="/admin">
                <i className="fas fa-fw fa-tachometer-alt" />
                <span>Dashboard</span></a>
            </li>
            {/* Nav Item - Pages Collapse Menu */}

            <li className="nav-item">
                <a className="nav-link" href="/">
                <i className="fas fa-fw fa-chart-area" />
                <span>Khu trọ</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/admin/phong">
                <i className="fas fa-fw fa-chart-area" />
                <span>Phòng</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="charts.html">
                <i className="fas fa-fw fa-chart-area" />
                <span>Dịch vụ</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="charts.html">
                <i className="fas fa-fw fa-chart-area" />
                <span>Hợp đồng</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="charts.html">
                <i className="fas fa-fw fa-chart-area" />
                <span>Hóa đơn</span></a>
            </li>
        </ul>
        );
    }
}

export default SideBar;