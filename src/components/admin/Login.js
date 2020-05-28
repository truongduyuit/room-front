import React, { Component } from 'react';
import '../../assets/css/sb-admin-2.min.css'
import {Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import {loginAction} from '../../actions/LoginActions'
import { produce } from 'immer';
import {withRouter } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {

    constructor(props){
        super(props)

        this.state = {
            userName: '',
            pass: ''
        }
    }

    componentDidMount() {
        console.log('hello')
        this.validate()
    }

    validate = async () => {
        const token = localStorage.getItem('token');

        if(token) {
            const validate = await axios({
                url: `http://localhost:8001/user/validate?token=${token}`,
                method: "POST",
            })

            if(validate) {
                if(validate.data && validate.data.data) {
                    this.setState({
                        isLogin: true
                    })
                    this.props.history.push('/admin')
                } else {
                    this.props.history.push('/dang-nhap')
                }

            }
        } else {
            this.props.history.push('/dang-nhap')
        }
    }


    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit = () => {
        console.log('ma')
        this.Login()
    }

    Login = async () => {
        const login = await axios({
            url: 'http://localhost:8001/user/login',
            method: 'POST',
            data: {
                userName: this.state.userName,
                pass: this.state.pass
            }
        })

        if(login) {
            console.log(login)
            if(login.data && login.data.data) {
                const {token, user} = login.data.data;

                localStorage.setItem('token', token);

                this.props.loginAction({
                    user
                })
            }
        }
    }

    render() {
        if (this.props.userLogin.username){
            return <Redirect to = "/admin"/>
        }
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

                                <form className="user">
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
                                    <input type="button" onClick={this.onSubmit} className="btn btn-primary btn-user btn-block" value=" Đăng Nhập"/>                                  
                                    <hr />
                                </form>
                                <hr />
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

const mapDispatchToProps =  {
    loginAction
}

const mapStateToProps = (state) => {
    return {
        userLogin: state.LoginReducer.userLogin
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));