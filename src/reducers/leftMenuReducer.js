import {LaptopOutlined, NotificationOutlined, UserOutlined} from "@ant-design/icons";
import React from "react";

export default (state, action) => {
   // console.log("reducer");
    let menu_data = [
        {
            "key": "sub1",
            "icon": <UserOutlined/>,
            "title": "Menu",
            "menu_item": [
                {
                    "key": "1",
                    "to": "/analyse",
                    "name": "数据质量监测"
                },
                {
                    "key": "2",
                    "to": "/testlogin",
                    "name": "测试未登录访问接口"
                },
                {
                    "key": "3",
                    "to": "/mytable",
                    "name": "资产负债表"
                },
                {
                    "key": "4",
                    "to": "/overview",
                    "name": "overview"
                },{
                    "key": "5",
                    "to": "/magnifier",
                    "name": "magnifier"

                }
            ]
        },
        {
            "key": "sub2",
            "icon": <LaptopOutlined/>,
            "title": "subnav 2",
            "menu_item": [
                {
                    "key": "4",
                    "name": "key4",
                    "to": "/mytable",
                },
                {
                    "key": "5",
                    "name": "key4",
                    "to": "/mytable",
                },
                {
                    "key": "6",
                    "name": "key4",
                    "to": "/mytable",
                },
                {
                    "key": "7",
                    "name": "key7",
                    "to": "/mytable",
                },
            ]
        },
        {
            "key": "sub3",
            "icon": <NotificationOutlined/>,
            "title": "subnav 3",
            "menu_item": [
                {
                    "key": "8",
                    "name": "key8",
                    "to": "/mytable",
                },
                {
                    "key": "9",
                    "name": "key9",
                    "to": "/mytable",
                },
                {
                    "key": "10",
                    "name": "key10",
                    "to": "/mytable",
                },
                {
                    "key": "11",
                    "name": "key11",
                    "to": "/mytable",
                },
            ]
        },
    ]
    switch (action.type) {
        case 'CHANGE':{
            return Object.assign([],state).map(item=>{
                return {
                    "key": item.key,
                    "icon": item.icon,
                    "title": item.title,
                    "menu_item":item.menu_item.map(x=>{
                        return {
                            "key": x.key,
                            "name": x.name+"@",
                            "to": x.to
                        }
                    })
                }
            });
        }
        case 'CHANGEBACK':{
            return menu_data;
        }
        default:
            return menu_data;
    }

}