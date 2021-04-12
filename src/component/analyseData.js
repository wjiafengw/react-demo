import {Button, Checkbox, Form, Upload, message, Table, Input, notification} from "antd";
import {UploadOutlined} from '@ant-design/icons';
import React from "react";
import {withRouter} from 'react-router-dom';
import * as XLSX from 'xlsx';
import * as echarts from 'echarts';

const openNotification = () => {
    /* notification.open({
         message: 'warning',
         description:
             'Please upload files!',
         onClick: () => {
             console.log('Notification Clicked!');
         },
     });*/
    message.error('Please upload files!');
};

function onChange(checkedValues) {
    check = checkedValues;
    console.log('checked = ', check);
}

const plainOptions = ['rate<=0.01%', '0.01%<rate<=1%', '1%<rate<=50%', '50%<rate<=100%'];


const _rawData = [];
let filerData = [];
let sort_rawData = [];
var myChart;
let check = ['rate<=0.01%'];
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    beforeUpload(file) {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (result) => {
            const workbook = XLSX.read(result.target.result, {
                type: 'binary'
            })
            let data = [];
            // 遍历每张工作表进行读取（这里默认只读取第一张表）
            for (const sheet in workbook.Sheets) {
                // esline-disable-next-line
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    // 利用 sheet_to_json 方法将 excel 转成 json 数据
                    data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                    // break; // 如果只取第一张表，就取消注释这行
                    console.log("data", data);
                }
            }
            //transfer
            _rawData.push(['primary_key', '空值率', '检查日期'])
            for (let item of data) {
                // console.log(item)
                _rawData.push(Object.values(item));
            }
            //console.log(_rawData);


        }
        return true;
    }
};


class analyseData extends React.Component {
    constructor() {
        super();
        this.state = {
            showErr: false,
            dataSource: [],
            columns: [
                {
                    title: 'primary_key',
                    dataIndex: 'primary_key',
                    key: 'primary_key',
                },
                {
                    title: '出现天数',
                    dataIndex: 'days',
                    key: 'days',
                    sorter: (a, b) => a.days - b.days,
                },
                {
                    title: '最大空值率',
                    dataIndex: 'max',
                    key: 'max',
                    sorter: (a, b) => a.max - b.max,

                },
                {
                    title: '最小空值率',
                    dataIndex: 'min',
                    key: 'min',
                    sorter: (a, b) => a.min - b.min,
                },
                {
                    title: '平均空值率',
                    dataIndex: 'avg',
                    key: 'avg',
                    sorter: (a, b) => a.min - b.min,
                }
            ]
        }
    }

    componentDidMount() {
        console.log("componentDidMount", this.props)
    }

    analyse = () => {
        //使用箭头函数，否则this undefined
        // 基于准备好的dom，初始化echarts实例
        if (_rawData.length == 0) {
            openNotification();
            /* alert(this.state.showErr);
             this.setState({'showErr': 'true','update':Math.random});
             //setstate后没有马上生效
             //第二次重复set输入showErr和之前一样，则不会出发重新渲染
             alert(this.state.showErr);*/
            //alert("return");
            return;
        }
        if (myChart != undefined) {
            myChart.clear();
        }


        myChart = echarts.init(document.getElementById('echarts1'));
        if (_rawData) {
            sort_rawData = _rawData.slice(1, _rawData.length).map(ary => {
                return [...ary];
            });

            sort_rawData.sort(function (a, b) {
                let d1 = new Date(a[2]);
                let d2 = new Date(b[2]);
                if (d1 > d2) {
                    return 1;
                } else {
                    return -1;
                }
            })
            let name_set = new Set();
            for (let i = 0; i < sort_rawData.length; i++) {
                name_set.add(sort_rawData[i][0]);
            }

            let name_set_array = Array.from(name_set);

            let name_count = [];
            for (let j = 0; j < name_set_array.length; j++) {
                name_count[j] = "";
            }

            for (let i = 0; i < sort_rawData.length; i++) {
                for (let j = 0; j < name_set_array.length; j++) {
                    if (name_set_array[j] == sort_rawData[i][0]) {
                        name_count[j] += sort_rawData[i][1] + ",";
                    }
                }
            }
            for (let j = 0; j < name_count.length; j++) {
                name_count[j] = name_count[j].substr(0, name_count[j].length - 1);
            }
            let name_count_size = [];

            for (let j = 0; j < name_count.length; j++) {
                name_count_size[j] = name_set_array[j] + "@" + name_count[j].split(",").length;//出现天数
                name_count_size[j] += "@" + Math.max.apply(null, name_count[j].split(","));//最大空值率
                name_count_size[j] += "@" + Math.min.apply(null, name_count[j].split(","));//最小空值率
                let temp = name_count[j].split(",");
                let sum = 0;
                for (let s = 0; s < temp.length; s++) {
                    sum += Number(temp[s]);
                }
                name_count_size[j] += "@" + sum / temp.length;//平均空值率
            }
            let new_data_source = [];
            for (let j = 0; j < name_count_size.length; j++) {
                var temp = name_count_size[j].split("@");
                new_data_source.push({
                    key: (j + 1).toString(),
                    primary_key: temp[0],
                    days: temp[1],
                    max: temp[2],
                    min: temp[3],
                    avg: temp[4],
                });
            }
            this.dataSource = new_data_source;
            this.setState({
                dataSource: new_data_source
            });
            sort_rawData.splice(0, 0, ['primary_key', '空值率', '检查日期']);
        }
        let
            q = "管理会计_空值检查_贷款信息M_MAT_LOAN_ACCTLON_LEVEL9_CLASS_CD\n" +
                "管理会计_空值检查_贷款信息M_MAT_LOAN_ACCTREPAY_PERIOD_CD\n" +
                "管理会计_空值检查_贷款信息M_MAT_LOAN_ACCTLON_LEVEL5_CLASS_CD\n" +
                "管理会计_空值检查_贷款信息M_MAT_LOAN_ACCTREPAY_WAY_CD\n" +
                "管理会计_空值检查_贷款信息M_MAT_LOAN_ACCTINT_BASE_CD\n" +
                "管理会计_空值检查_贷款信息M_MAT_LOAN_ACCTINT_RATE_MODE_CD\n" +
                "管理会计_空值检查_贷款信息M_MAT_LOAN_ACCTIS_M_NEWCUST\n" +
                "管理会计_空值检查_贷款信息M_MAT_LOAN_ACCTIS_Y_NEWCUST\n" +
                "管理会计_空值检查_贷款信息M_MAT_LOAN_ACCTSECURI_TYPE\n" +
                "管理会计_空值检查_贷款信息M_MAT_LOAN_ACCTDIR_INDUS_CD\n" +
                "管理会计_空值检查_贷款信息M_MAT_LOAN_ACCTGUAR_WAY_CD\n" +
                "管理会计_空值检查_贷款信息M_MAT_LOAN_ACCTRENEW_IND\n" +
                "管理会计_空值检查_贷款信息M_MAT_LOAN_ACCTLON_LEVEL4_CLASS_CD\n" +
                "管理会计_空值检查_贷款信息M_MAT_LOAN_ACCTIS_INCLUSIVE_FINANCIAL\n" +
                "管理会计_空值检查_科目信息M_MAT_SUBJ_INFOSUPER_SUBJECT_NO\n" +
                "管理会计_空值检查_逾期明细表M_MAT_OVERDUECLPM_PROD_NO\n" +
                "管理会计_空值检查_逾期明细表M_MAT_OVERDUEDIR_INDUS_CD\n" +
                "管理会计_空值检查_零售客户信息表M_MAT_P_CUST_INFOAGE\n" +
                "管理会计_空值检查_零售客户信息表M_MAT_P_CUST_INFOREGI_DT\n" +
                "管理会计_空值检查_零售客户信息表M_MAT_P_CUST_INFOGENDER_CD\n" +
                "管理会计_空值检查_零售客户信息表M_MAT_P_CUST_INFOCUST_NAME\n" +
                "管理会计_空值检查_零售客户信息表M_MAT_P_CUST_INFOBIRTH_DT\n" +
                "管理会计_空值检查_机构表M_MAT_INT_ORG_INFODIST_CD\n" +
                "管理会计_空值检查_活期存款M_MAT_DEMAND_DEPOSITCUST_HIERARCHY\n" +
                "管理会计_空值检查_活期存款M_MAT_DEMAND_DEPOSITBASE_INT_RATE\n" +
                "管理会计_空值检查_公司客户信息表M_MAT_C_CUST_INFOINDUS_TYPE_CD\n" +
                "管理会计_空值检查_公司客户信息表M_MAT_C_CUST_INFODIST_CD\n" +
                "管理会计_空值检查_公司客户信息表M_MAT_C_CUST_INFOCUST_NAME\n" +
                "管理会计_空值检查_公司客户信息表M_MAT_C_CUST_INFOIS_GOV_FIN\n" +
                "管理会计_空值检查_公司客户信息表M_MAT_C_CUST_INFOIS_GO_FLG\n" +
                "管理会计_空值检查_代销基金M_MAT_AGENT_FUNDMAT_PROD_NO";
        var
            primary_keys = q.split("\n");
        var
            datasetWithFilters = [];
        var
            seriesList = [];
        echarts
            .util
            .each(primary_keys,
                function (primary_key) {
                    var datasetId = 'dataset_' + primary_key;
                    datasetWithFilters.push({
                        id: datasetId,
                        fromDatasetId: 'sort_rawData',
                        transform: {
                            type: 'filter',
                            config: {
                                and: [
                                    /*   {dimension: '空值率', '<': '0.02'},*/
                                    {dimension: 'primary_key', '=': primary_key}
                                ]
                            }
                        },
                    });
                    seriesList.push({
                        type: 'line',
                        datasetId: datasetId,
                        showSymbol: false,
                        name: primary_key,
                        /*  endLabel: {
                              show: true,
                              formatter: function (params) {
                                  return params.value[0] + ': ' + params.value[1];
                              }
                          },*/
                        labelLayout: {
                            moveOverlap: 'shiftY'
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        smooth: true,
                        encode: {
                            x: '检查日期',
                            y: '空值率',
                            label: ['primary_key', '空值率'],
                            itemName: '检查日期',
                            tooltip: ['空值率'],
                        }
                    });
                }
            )
        ;

        /* myChart.on('highlight', (params) => {console.log("highlight",params)})*/
        //setOption前设置
        myChart.on('click', (params) => {
            console.log("click", params)
            /* myChart.setOption({
                 tooltip: {
                     /!* order: 'valueDesc',*!/
                     trigger: 'axis',
                     formatter: function () {
                         var res = '<div>detail</div>'
                         return res;
                     },
                 }
             });*/
        })

        myChart.on('mouseout', (params) => {
            /*  console.log("mouseout", params)
              myChart.setOption({
                  tooltip: {
                      /!* order: 'valueDesc',*!/
                      trigger: 'axis',
                      formatter: function () {
                          var res = '<div>All</div>'
                          return res;
                      },
                  }
              });*/
        })

        myChart
            .setOption({
                    animationDuration: 10000,
                    dataset: [{
                        id: 'sort_rawData',
                        source: sort_rawData
                    }].concat

                    (
                        datasetWithFilters
                    ),
                    /*title: {
                        text: '数据质量检查'
                    }
                    ,*/
                    tooltip: {
                        /* order: 'valueDesc',*/
                        trigger: 'axis',
                        formatter: function (params) {
                            // console.log(params);
                            params.sort(function (a, b) {
                                return b.data[1] - a.data[1];
                            })
                            var res = '<div>'
                            if (params.length > 20) {
                                for (var i = 0; i < params.length; i += 2) {
                                    res += '<p style="height:3px"><span style="display:inline-block;width:600px">' + params[i].marker;//seriesName data[1]
                                    res += params[i].seriesName.substr(10);
                                    res += ":" + params[i].data[1];
                                    res += '</span>';
                                    if (i + 1 < params.length) {
                                        res += '<span style="margin-left:10px">';
                                        res += params[i + 1].marker;
                                        res += params[i + 1].seriesName.substr(10);
                                        res += ":" + params[i + 1].data[1] + '</span>';
                                    }
                                    res += '</p></div>';

                                }
                            } else {
                                for (var i = 0; i < params.length; i++) {
                                    res += '<p style="height:3px">' + params[i].marker;//seriesName data[1]
                                    res += params[i].seriesName.substr(10);
                                    res += ":" + params[i].data[1];
                                    res += '</p></div>';
                                }
                            }
                            return res;
                        },
                    }
                    ,
                    xAxis: {
                        type: 'category',
                        nameLocation: 'middle'
                    }
                    ,
                    yAxis: {
                        name: '空值率'
                    }
                    ,
                    grid: {
                        right: 30
                    }
                    ,
                    series: seriesList
                }, true
            )
        ;
    }

    render() {
        return (
            <div>
                <div style={{'position': 'relative', 'height': '50px'}}>
                    <Upload  {...props}>
                        <Button icon={<UploadOutlined/>}>Click to Upload</Button>
                    </Upload>
                </div>
                <div style={{'marginTop': '20px'}}>
                    <Button type="primary" htmlType="submit" onClick={this.analyse}>
                        analyse
                    </Button>
                </div>
                <div id="echarts1" style={{width: '1150px', height: '700px'}}></div>
                {this.state.dataSource.length != 0 ?
                    < Table dataSource={this.state.dataSource} columns={this.state.columns}/> : null
                }
            </div>);
    }
}

export default withRouter(analyseData);
