import logo from './logo.svg';
import './App.css';
import LeftMenu from "./component/LeftMenu"
import React from 'react';
import TestLogin from './component/TestLogin';
/*import {createBrowserHistory} from "history";*/
import AnalyseData from "./component/analyseData";
import Mytable from "./component/Mytable";
import OverView  from  "./component/overView";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
} from "react-router-dom";
import {Button, Form, Input, Checkbox, Layout, Menu, Breadcrumb, Row, Col, Dropdown, message} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import axios from "axios";
import Magnifier from "./component/Magnifier";

const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;


function getCookie(name) {
    var strcookie = document.cookie;//获取cookie字符串
    var arrcookie = strcookie.split("; ");//分割
    //遍历匹配
    for (var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0] == name) {
            return arr[1];
        }
    }
    return "";
}

//删除cookie
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        axios.defaults.withCredentials = true
        axios.get('http://localhost:3001/another')
            .then((res) => {
                console.log("res", res);
                if (!res.data.success) {
                    message.error(res.data.message);
                    this.props.history.push("/login");
                    /*  setTimeout(function () {
                          window.location.reload();
                      }, 1000);*/

                } else {
                    message.success(res.data.message);
                }
            });
    }

    onClick = ({key}) => {

        if (key == 1) {
            delCookie('username');
            delCookie('token');
            console.log(this.props);
            this.props.history.push('/login');
            message.success(`退出成功!!!!`);
        }
    };

    menu = (
        <Menu onClick={this.onClick}>
            <Menu.Item key="1">退出登录</Menu.Item>
        </Menu>
    );

    render() {
        return (
            <Router>
                <div style={{'minHeight': '100%', 'height': '100%'}}>
                    <Layout style={{'minHeight': '100%'}}>
                        <Header className="header">
                            <div style={{'position': 'relative'}} className="logo"/>
                            <Menu style={{'display': 'inline-block'}} theme="dark" mode="horizontal"
                                  defaultSelectedKeys={['2']}>
                                <Menu.Item key="1" onClick={this.props.changeName}>点击我改变菜单</Menu.Item>
                                <Menu.Item key="2" onClick={this.props.changeBack}>点击我恢复</Menu.Item>
                            </Menu>
                            <Dropdown overlay={this.menu}>
                                <a style={{'position': 'absolute', 'left': '90%', 'marginLeft': '50px'}}
                                   className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    您好, {getCookie('username')} <DownOutlined/>
                                </a>
                            </Dropdown>
                        </Header>
                        <Content style={{padding: '0 50px', 'minHeight': '100%'}}>
                            <Breadcrumb style={{margin: '16px 0'}}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                                <Row style={{minWidth: '100%'}}>
                                    <Col span={4}><Sider>
                                        <LeftMenu data={this.props}/>
                                    </Sider></Col>
                                    <Col span={20}>
                                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                            {/* justifyContent: 'center', alignItems: 'center'*/}
                                            <Switch>
                                                <Route path="/analyse" exact component={AnalyseData}/>
                                                <Route path="/testlogin" component={TestLogin}/>
                                                <Route path="/mytable" component={Mytable}/>
                                                <Route path="/overview" component={OverView}/>
                                                <Route path="/magnifier" component={Magnifier}/>
                                            </Switch>
                                        </div>
                                    </Col>
                                </Row>
                            </Layout>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </div>
            </Router>
        )
    }
}

//neccessary if want this.props.history
export default withRouter(App);
