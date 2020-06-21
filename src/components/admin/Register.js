import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Form, Input, Button, Select} from 'antd';
import {Row, Col} from 'reactstrap';
import axios from 'axios';
import data from '../../assets/provincial.json';
import {toast, ToastContainer} from 'react-toastify';
import {withRouter} from 'react-router-dom';

const {Option} = Select;

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16}
};
const tailLayout = {
    wrapperCol: {offset: 20, span: 16}
};

class Register extends Component {
    
    pass = React.createRef();
    
    state = {
        sex: '',
        province: ''
    }

   onFinish = values => {
       if (values.pass !== values.confirm) {
           toast.error('Xác nhận mật khẩu không đúng');
           this.pass.current.focus();
       }
       else {
           this.Register(values);
       }

   };

    Register = async (account) => {
        const register = await axios({
            url: 'http://localhost:8001/user/register',
            method: 'POST',
            data: {
                fullName: account.fullName,
                sex: account.sex,
                userName: account.userName,
                email: account.email,
                province: account.province,
                address: account.address,
                pass: account.pass,
                confirm: account.confirm,
                role: 1
            }
        });

        if (register) {
            if (register.data && register.data.data) {
                toast.success('Đăng ký thành công');

                setTimeout(() => {
                    this.props.history.push('/dang-nhap');        
                }, 5000);
            }
            else if (register.data.message)
            {
                toast.error('Tài khoản đã tồn tại !');
            }
        }
    }

   onGenderChange = value => {
       this.setState({
           sex : value.sex,
           province: value.province
       });
   }

   renderProvinces = () => {
       return data.map(item => {
           return <Option 
               key={item.province} 
               value={item.province}>{item.province}
           </Option>;
       });
   }

   render() {
       return (
           <div className="container">
               <div className="card o-hidden border-0 shadow-lg my-5">
                   <div className="card-body p-0">
                       {/* Nested Row within Card Body */}
                       <div className="row">
                           <div className="col-lg-4 d-none d-lg-block">
                               <img src= "https://r-cf.bstatic.com/images/hotel/max1024x768/148/148672944.jpg" alt= "" style = {{width: '100%', height: '100%'}} />
                           </div>
                           <div className="col-lg-8">
                               <div className="p-5">
                                   <div className="text-center">
                                       <h1 className="h4 text-gray-900 mb-4">Đăng ký tài khoản</h1>
                                   </div>
                                   <Form
                                       {...layout}
                                       name="basic"
                                       initialValues={{remember: true}}
                                       onFinish={this.onFinish}
                                   >
                                       <Row>
                                           <Col>
                                               <Form.Item
                                                   label="Họ tên"
                                                   name="fullName"
                                                   rules={[{required: true, message: 'Nhập họ tên'}]}
                                               >
                                                   <Input />
                                               </Form.Item>
                                           </Col>

                                           <Col>
                                               <Form.Item
                                                   label="Giới tính: "
                                                   name="sex"
                                                   rules={[{required: true, message: 'Phải chọn giới tính'}]}
                                               >
                                                   <Select
                                                       placeholder="Chọn giới tính"
                                                       onChange={this.onGenderChange}
                                                       allowClear
                                                   >
                                                       <Option value="male">Nam</Option>
                                                       <Option value="female">Nữ</Option>
                                                   </Select>
                                               </Form.Item>
                                           </Col>
                                       </Row>
                                       
                                       <Row>
                                           <Col>
                                               <Form.Item
                                                   label="Tài khoản"
                                                   name="userName"
                                                   rules={[{required: true, message: 'Hãy nhập tài khoản !'}]}
                                               >
                                                   <Input placeholder="Nhập tài khoản" />
                                               </Form.Item>
                                           </Col>

                                           <Col>
                                               <Form.Item
                                                   label="Email: "
                                                   name="email"
                                                   rules={[{required: true, message: 'Hãy nhập email', type: 'email'}]}
                                               >
                                                   <Input />
                                               </Form.Item>
                                           </Col>
                                       </Row>

                                       <Row>
                                           <Col>
                                               <Form.Item
                                                   label="Mật khẩu"
                                                   name="pass"
                                                   rules={[{required: true, message: 'Hãy nhập mật khẩu'}]}
                                               >
                                                   <Input.Password ref={this.pass} />
                                               </Form.Item>
                                           </Col>
                                           <Col>
                                               <Form.Item
                                                   label="Xác nhận"
                                                   name="confirm"
                                                   rules={[{required: true, message: 'Xác nhận mật khẩu'}]}
                                               >
                                                   <Input.Password />
                                               </Form.Item>
                                           </Col>
                                       </Row>

                                       <Row>
                                           <Col>
                                               <Form.Item
                                                   label="Tỉnh"
                                                   name="province"
                                                   rules={[{required: true, message: 'Hãy chọn tỉnh !'}]}
                                               >
                                                   <Select
                                                       placeholder="Chọn giới tính"
                                                       onChange={this.onGenderChange}
                                                       allowClear
                                                   >
                                                       {this.renderProvinces()}
                                                   </Select>
                                               </Form.Item>
                                           </Col>

                                           <Col>
                                               <Form.Item
                                                   label="Địa chỉ: "
                                                   name="address"
                                                   rules={[{required: true, message: 'Hãy nhập địa chỉ'}]}
                                               >
                                                   <Input />
                                               </Form.Item>
                                           </Col>
                                       </Row>

                                       <Form.Item {...tailLayout}>
                                           <Button type="primary" htmlType="submit">
                                                Đăng ký
                                           </Button>
                                       </Form.Item>
                                   </Form>
                                   <hr />
                                   <div className="text-center">
                                       <Link className="small" to="/dang-nhap">Đăng nhập</Link> 
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
               <ToastContainer />
           </div>
       );
   }
}

export default withRouter(Register);