import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './components/admin/Login';
import Register from './components/admin/Register';
import IndexAdmin from './components/admin/IndexAdmin';
import Block from './components/admin/block/Index';
import Room from './components/admin/room/index';

class Routers extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/dang-nhap"> <Login /> </Route>

                <Route exact path="/dang-ky">  <Register /> </Route>
                   
                <Route exact path="/admin"> <IndexAdmin /> </Route>
                
                <Route exact path="/admin/khu-tro"> <Block /> </Route> 

                <Route exact path="/admin/phong"> <Room /> </Route>
                
            </Switch>
        );
    }
}

export default Routers;