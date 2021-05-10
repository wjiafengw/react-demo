import React from "react";
import {Form, Input, Button, Checkbox, message, Typography} from 'antd';
import axios from 'axios';
//import cookieParser from 'cookie-parser'

const {Title} = Typography;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};


class login extends React.Component {
    constructor() {
        super();
        this.formRef = React.createRef();
        //
        axios.defaults.withCredentials = true
        axios.post('http://localhost:3001/login', {}, {})
            .then((res) => {
                //application的cookies和response cookies 有什么区别
                if (res.data.success == true) {
                    message.success('您已登录!');
                    this.props.history.push("/");
                }
            })
    }


    componentDidMount() {
        console.log("componentDidMount", this.props)

    }

    onFinish = (values) => {
        /*    axios.interceptors.response.use(function (response) {
                console.log("response",response);
                return response;
            }, function (error) {
                return Promise.reject(error);
            });*/
        let loginData = {"username": values.username, "password": values.password};
        console.log('Success:', values);
        //跨域请求中携带cookie
        axios.defaults.withCredentials = true
        axios.post('http://localhost:3001/login', loginData, {
            /*  headers: {
                  'token': document.cookie
              }*/
        })
            .then((res) => {
                console.log("res", res);
                /*     var days = 60;
                     var exp = new Date();
                     exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
                     document.cookie = 'token=' + escape(res.data.token) + ";expires=" + exp.toGMTString();*/
                //不显示expires
                console.log(document.cookie);
                //application的cookies和response cookies 有什么区别
                if (res.data.success == true) {
                    this.props.history.push("/");
                } else {
                    message.error('登录失败，请输入正确的用户名和密码!');
                    this.onReset();
                }
            })
    };

    onReset = () => {
        this.formRef.current.resetFields();
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    toSignUp = () => {
        this.props.history.push("/signup");
    }

    render() {
        return (
            <div style={{'position': 'absolute', 'top': '220px', 'left': '75%', 'marginLeft': '-150px'}}>
                <h2 style={{'textAlign': 'center', 'position': 'relative', 'left': '24px'}}>登录</h2>
                {/*   <Title style={{'textAlign': 'center', 'position': 'relative', 'left': '24px'}} level={3}>登录</Title>*/}
                <Form
                    {...layout}
                    /*  name="basic"*/
                    ref={this.formRef}
                    name="control-ref"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button onClick={this.toSignUp}>signup</Button>
                    </Form.Item>
                </Form>
            </div>);
    }
}

export default login;
