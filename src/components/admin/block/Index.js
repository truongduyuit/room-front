import React, {Component} from 'react';
import '../../../assets/css/sb-admin-2.min.css';
import '../../../assets/vendor/datatables/dataTables.bootstrap4.min.css';
import SideBar from '../SideBar';
import Topbar from '../Topbar';
import BlockTable from './BlockTable';
import LogoutModal from '../LogoutModal';

class Index extends Component {

    render() {

        return (
            <div>
                <div className="container-fluid">
                    <BlockTable />
                </div>
            </div>

        );
    }
}

export default Index;