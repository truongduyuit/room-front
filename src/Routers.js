// Libraries
import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

// Components
import Login from './components/admin/Login';
import Register from './components/admin/Register';
import IndexAdmin from './components/admin/IndexAdmin';
import Block from './components/admin/block/Index';
import Room from './components/admin/room/index';
import Service from './components/admin/service/Index';
import Customer from './components/admin/customer/Index';
import Contract from './components/admin/contract/Index';
import Admin from './components/admin/index';
import Home from './components/web/Index';
import Bill from './components/admin/bill/Index';

class Routers extends Component {
    render() {
        return (
            <Switch>

                <Route exact path="/"> <Home /> </Route>

                <Route exact path="/dang-nhap"> <Login /> </Route>

                <Route exact path="/dang-ky">  <Register /> </Route>
                   
                {/* <Route exact path="/admin"> <IndexAdmin /> </Route> */}

                <Route path="/admin"> <Admin /> </Route>
                
            </Switch>
        );
    }
}

export default Routers;