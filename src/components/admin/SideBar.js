import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const HoverText = styled.span`
	:hover {
		color: #007bff;
		cursor: pointer;
	}
`;

const listMenu = [
    {key: 'bangdieukhien', label: 'Bảng điều khiển', link: '/admin'},
    {key: 'khutro', label: 'Khu trọ', link: '/admin/khu-tro'},
    {key: 'phong', label: 'Phòng', link: '/admin/phong'},
    {key: 'khachhang', label: 'Khách hàng', link: '/admin/khach-hang'},
    {key: 'dichvu', label: 'Dịch vụ', link: '/admin/dich-vu'},
    {key: 'hopdong', label: 'Hợp đồng', link: '/admin/hop-dong'},
    {key: 'hoadon', label: 'Hóa đơn', link: '/admin/hoa-don'}
];

class SideBar extends Component {
    
    state = {
        idActive: 'bangdieukhien'
    }

    componentDidMount() {
        console.log('didMount');
    }

    onClickTab = (key) => {
        this.setState({
            idActive: key
        });
    }

    showRenderMenu = () => {
        if (listMenu && listMenu.length > 0) {
            return listMenu.map(item => (
                <li key={item.key} className={`nav-item ${item.key === this.state.idActive && 'active'}`} id={item.key} onClick={() => this.onClickTab(item.key)}>
                    <Link className="nav-link" to={item.link}>
                        <i className="fas fa-fw fa-tachometer-alt" />
                        <span>{item.label}</span>
                    </Link>
                </li>
            ));
        }
    }

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
                {this.showRenderMenu()}
            </ul>
        );
    }
}

export default SideBar;