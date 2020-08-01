import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

// Components
import SideBar from './SideBar';
import LogoutModal from './LogoutModal';
import Topbar from './Topbar';
import Block from './block/Index';
import Room from './room/index';
import Service from './service/Index';
import Customer from './customer/Index';
import Contract from './contract/Index';
import Bill from './bill/Index';
import IndexAdmin from './IndexAdmin';

class Admin extends Component {
    render() {
        return (
            <div>
                {/* Page Wrapper */}
                <div id="wrapper">                  
                    <SideBar />
                    {/* Content Wrapper */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        {/* Main Content */}
                        <div id="content">
                            {/* Topbar */}
                            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                                {/* Topbar Navbar */}
                                <ul className="navbar-nav ml-auto">
                                    {/* Nav Item - Search Dropdown (Visible Only XS) */}
                                    <li className="nav-item dropdown no-arrow d-sm-none">
                                        {/* <Link className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fas fa-search fa-fw" />
                                        </Link> */}
                                        {/* Dropdown - Messages */}
                                        <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                                            <form className="form-inline mr-auto w-100 navbar-search">
                                                <div className="input-group">
                                                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-primary" type="button">
                                                            <i className="fas fa-search fa-sm" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </li>
                                    {/* Nav Item - Alerts */}                                    
                                    <Topbar />
                                </ul>
                            </nav>
                            {/* End of Topbar */}
                            <Switch>
                                <Route exact path="/admin" render={props => <IndexAdmin {...props} />} /> 

                                <Route exact path="/admin/khu-tro" render={props => <Block {...props} />} />

                                <Route exact path="/admin/phong" render={props => <Room {...props} />} />

                                <Route exact path="/admin/dich-vu" render={props => <Service {...props} />} />

                                <Route exact path="/admin/khach-hang" render={props => <Customer {...props} />} />

                                <Route exact path="/admin/hop-dong" render={props => <Contract {...props} />} />
                
                                <Route exact path="/admin/hoa-don" render={props => <Bill {...props} />} />
                            </Switch>
                        
                            {/* Begin Page Content */}
                            {/* /.container-fluid */}
                        </div>
                        {/* End of Main Content */}
                        {/* Footer */}
                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright © Your Website {2020}</span>
                                </div>
                            </div>
                        </footer>
                        {/* End of Footer */}
                    </div>
                    {/* End of Content Wrapper */}
                </div>
                {/* End of Page Wrapper */}
                {/* Scroll to Top Button */}
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up" />
                </a>
                {/* Logout Modal */}
                <LogoutModal />
            </div>
        );
    }
}

export default Admin;