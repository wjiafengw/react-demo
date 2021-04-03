import * as echarts from 'echarts';
import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import App from "../App";
import {Button, Form, message} from "antd";
import axios from "axios";
import {withRouter, Link, Redirect} from 'react-router-dom'


class TestLogin extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    test = () => {
        axios.defaults.withCredentials = true
        axios.get('http://localhost:3001/another')
            .then((res) => {
                console.log("res", res);
                if (!res.data.success) {
                    message.error(res.data.message);
                    this.props.history.push("/login");

                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);

                } else {
                    message.success(res.data.message);
                }
            });
    }

    render() {
        return (
            <div>
                <Button type="primary" htmlType="submit" onClick={this.test}>
                    测试未登录访问接口
                </Button>
            </div>

        )
    }
}


export default withRouter(TestLogin);
