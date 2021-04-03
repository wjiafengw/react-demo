import {Menu} from "antd";
import {LaptopOutlined, NotificationOutlined, UserOutlined} from "@ant-design/icons";
import React from "react";
import {createBrowserHistory} from "history";
import {withRouter, Link} from 'react-router-dom'

const {SubMenu} = Menu;


function store_mock(menu_data) {
    let render_wrap = [];
    for (let i = 0; i < menu_data.length; i++) {
        //如果这里只写submenu再后面再补充/submenu的话，中间部分的代码无法识别
        //所以应该是要push进去整个闭合的submenu
        /*render_wrap.push(<SubMenu key={menu_data[i].key} icon={menu_data[i].icon} title={menu_data[i].title}>);*/
        let menu_item_wrap = [];
        for (let j = 0; j < menu_data[i].menu_item.length; j++) {
            menu_item_wrap.push(<Menu.Item key={i.toString() + "-" + j.toString()}><Link
                to={menu_data[i].menu_item[j].to}>{menu_data[i].menu_item[j].name}</Link></Menu.Item>);
        }
        render_wrap.push(<SubMenu key={menu_data[i].key} icon={menu_data[i].icon}
                                  title={menu_data[i].title}>{menu_item_wrap}</SubMenu>);
    }
    return <Menu
        mode="inline"
        defaultOpenKeys={['sub1']}
        defaultSelectedKeys={['0-0']}
        style={{height: '100%'}}
    >{render_wrap}</Menu>
}


class LeftMenu extends React.Component {
    constructor(props) {
        //props不写不行！
        super(props);
        console.log("lefmenu", this.props.data.value)
        /*  this.history = createBrowserHistory();*/
        //若使用hh1():{}则要加this绑定
        /*    this.hh1 = this.hh1.bind(this);
            this.hh2 = this.hh2.bind(this);
            this.hh3 = this.hh3.bind(this);*/
    }

    componentDidMount() {
    }


    render() {
        return store_mock(this.props.data.value)
    }
}

export default LeftMenu;
