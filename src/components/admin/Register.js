import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Register extends Component {
    render() {
        return (
                <div className="container">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                    {/* Nested Row within Card Body */}
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-block">
                            <img src= "https://r-cf.bstatic.com/images/hotel/max1024x768/148/148672944.jpg" alt= "" style = {{width: "100%", height: "100%"}}/>
                        </div>
                        <div className="col-lg-7">
                        <div className="p-5">
                            <div className="text-center">
                            <h1 className="h4 text-gray-900 mb-4">Đăng ký tài khoản</h1>
                            </div>
                            <form className="user">
                            <div className="form-group row">
                                <div className="col-sm-6 mb-3 mb-sm-0">
                                    <input type="text" className="form-control" id="exampleFirstName" placeholder="Nhập họ tên (*)" />                                   
                                </div>
                                <div className="col-sm-6">
                                    <select name = "gender" id="gender" className= "form-control">
                                        <option value="default" selected >Chọn giới tính (*)</option>
                                        <option value="boy" >Nam</option>
                                        <option value="girl">Nữ</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-6 mb-3 mb-sm-0">
                                    <input type="text" className="form-control" id="exampleFirstName" placeholder="Tên tài khoản (*)" />                                   
                                </div>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control" id="exampleFirstName" placeholder="Nhập email (*)" />   
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-6 mb-3 mb-sm-0">
                                <input type="password" className="form-control" id="exampleInputPassword" placeholder="Nhập mật khẩu (*)" />
                                </div>
                                <div className="col-sm-6">
                                <input type="password" className="form-control" id="exampleRepeatPassword" placeholder="Nhập lại mật khẩu (*)" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-6 mb-3 mb-sm-0">
                                    <select name = "city" id="city" className= "form-control">
                                        <option value="default" selected >Chọn tỉnh (*)</option>
                                        <option value="hcm">Hồ Chí Minh</option>
                                        <option value="hanoi">Hà Nội</option>
                                    </select>                                
                                </div>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control" id="exampleFirstName" placeholder="Nhập địa chỉ (*)" />   
                                </div>
                            </div>
                            <a href="login.html" className="btn btn-primary btn-user btn-block">
                                Đăng ký tài khoản
                            </a>
                            <hr />
                            {/* <a href="index.html" className="btn btn-google btn-user btn-block">
                                <i className="fab fa-google fa-fw" /> Register with Google
                            </a>
                            <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                <i className="fab fa-facebook-f fa-fw" /> Register with Facebook
                            </a> */}
                            </form>
                            <hr />
                            {/* <div className="text-center">
                            <a className="small" href="forgot-password.html">Forgot Password?</a>
                            </div> */}
                            <div className="text-center">
                                <Link className="small" to="/dang-nhap">Đăng nhập</Link> 
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

export default Register;