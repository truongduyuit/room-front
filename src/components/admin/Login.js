import React, { Component } from 'react';
import '../../assets/css/sb-admin-2.min.css'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Login extends Component {

    constructor(props){
        super(props)

        let loggedIn = false;
        this.state = {
            userName: '',
            pass: '',
            loggedIn
        }

        this.LoginSubmit = this.LoginSubmit.bind(this);
    }

    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    LoginSubmit(e){
        e.preventDefault();
        console.log(this.state)
        console.log("1")

        axios.post("http://localhost:8001/user/login", this.state) // username, password
            .then(response =>{
                console.log(response);
            })
            .catch(error =>{
                console.log(error);
            })
    }

    render() {
        return (
                <div className="container">
                {/* Outer Row */}
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                        {/* Nested Row within Card Body */}
                        <div className="row">
                            <div className="col-lg-6 d-none d-lg-block">
                                <img src= "https://r-cf.bstatic.com/images/hotel/max1024x768/148/148672944.jpg" alt= "" style = {{width: "100%", height: "100%"}}/>
                            </div>
                            <div className="col-lg-6">
                            <div className="p-5">
                                <div className="text-center">
                                <h1 className="h4 text-gray-900 mb-4">Đăng nhập</h1>
                                </div>

                                <form className="user" onSubmit={this.LoginSubmit}>
                                <div className="form-group">
                                    <input type="text" 
                                        className="form-control form-control-user" 
                                        id="exampleInputEmail" 
                                        name="userName" 
                                        onChange = {(e) => this.onChange(e)}
                                        value = {this.state.userName}
                                        aria-describedby="emailHelp" 
                                        placeholder="Nhập tài khoản..." 
                                        />
                                </div>
                                <div className="form-group">
                                    <input type="password" 
                                        className="form-control form-control-user" 
                                        id="exampleInputPassword" 
                                        name= "pass"
                                        onChange = {(e) => this.onChange(e)}
                                        value = {this.state.pass}
                                        placeholder="Nhập mật khẩu" />
                                </div>
                                <div className="form-group">
                                    <div className="custom-control custom-checkbox small">
                                    <input type="checkbox" className="custom-control-input" id="customCheck" />
                                    <label className="custom-control-label" htmlFor="customCheck">Nhớ mật khẩu</label>
                                    </div>
                                </div>
                                <input type="submit" className="btn btn-primary btn-user btn-block" value=" Đăng Nhập"/>
                                   
                                <hr />
                                {/* <a href="index.html" className="btn btn-google btn-user btn-block">
                                    <i className="fab fa-google fa-fw" /> Login with Google
                                </a>
                                <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                    <i className="fab fa-facebook-f fa-fw" /> Login with Facebook
                                </a> */}
                                </form>
                                <hr />
                                {/* <div className="text-center">
                                <a className="small" href="forgot-password.html">Forgot Password?</a>
                                </div> */}
                                <div className="text-center">
                                    <Link className="small" to="/dang-ky">Đăng ký thành viên</Link>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;