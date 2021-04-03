import React from "react";
import {Form, Input, Button, Checkbox, message} from 'antd';
import axios from 'axios';

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

class signup extends React.Component {
    constructor() {
        super();
        this.formRef = React.createRef();
    }

    componentDidMount() {
        console.log("componentDidMount", this.props)
    }

    onFinish = (values) => {
        if(values.password1!=values.password2){
            message.error("两次输入的密码不一致!");
            this.onReset();
            return;
        }
        let signData = {"username":values.username,"password":values.password1};
        console.log('Success:', values);
        axios.post('http://localhost:3001/signup',signData,{
           /* headers: {
                'token': document.cookie
            }*/
        })
            .then((res) => {
               console.log(res);
               if(res.data.success==true){
                   message.success("注册成功!");
                   this.props.history.push("/login");
               }  else{
                   message.error(res.data.message);
                   this.onReset();
               }
            })

    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    onReset = () => {
        this.formRef.current.resetFields();
    };


    render() {
        return (
            <div style={{'position': 'absolute', 'top': '220px', 'left': '75%', 'marginLeft': '-150px'}}>
                <h2 style={{'textAlign': 'center','position':'relative','left':'24px'}}>注册</h2>
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
                        name="password1"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        label="password again"
                        name="password2"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password again!',
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>);
    }
}

export default signup;
