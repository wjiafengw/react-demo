import { Table, Tag, Space } from 'antd';
import React from "react";
const columns = [
    {
        title: '资产',
        dataIndex: 'zichan',
        key: 'zichan',
    },
    {
        title: '期初余额',
        dataIndex: 'qichuyue1',
        key: 'qichuyue1',
    },
    {
        title: '期末余额',
        dataIndex: 'qimoyue1',
        key: 'qimoyue1',
    },
    {
        title: '负债及所有者权益',
        dataIndex:'fuzhaijisuoyouzhequanyi',
        key: 'fuzhaijisuoyouzhequanyi',
    },
    {
        title: '期初余额',
        dataIndex: 'qichuyue2',
        key: 'qichuyue2',
    },
    {
        title: '期末余额',
        dataIndex: 'qichuyue2',
        key: 'qimoyue2',
    },
];

const data = [
    {
        zichan:'现金及存放中央银行款项',
        qichuyue1:"19,213,055,915.22",
        qimoyue1:"25,619,679,955.84",
        fuzhaijisuoyouzhequanyi:"向中央银行借款",
        qichuyue2: "8,994,896,922.57",
        qimoyue2:"10,014,157,258.38",
        key:1
    },
    {
        zichan:'贵金属\n',
        qichuyue1:"81,728,004.00\n",
        qimoyue1:"201,925.00\n",
        fuzhaijisuoyouzhequanyi:"同业及其他金融机构存放款项\n",
        qichuyue2: "1,315,309,493.35\n",
        qimoyue2:"615,615,984.47\n",
        key:2
    }
];
function Mytable(){
    return (
    <Table columns={columns} dataSource={data} />
    )
}
export  default Mytable;