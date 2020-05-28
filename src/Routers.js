import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/admin/Login';
import Register from './components/admin/Register';
import IndexAdmin from './components/admin/IndexAdmin';
import Room from './components/admin/room/Index'

class Routers extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/dang-nhap">
                    <Login/>
                </Route>

                <Route exact path="/dang-ky">
                      <Register/>
                </Route>

                <Route exact path="/admin">
                    <IndexAdmin/>
                </Route>
                <Route exact path="/admin/phong">
                    <Room/>
                </Route> 
            </Switch>
        );
    }
}

export default Routers;