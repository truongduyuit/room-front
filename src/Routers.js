import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/admin/Login';
import Register from './components/admin/Register';

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
            </Switch>
        );
    }
}

export default Routers;