import React from "react";
import {withRouter} from 'react-router-dom';
import * as echarts from 'echarts';

import * as highcharts from 'highcharts';



var myChart1;
var mychart2;
var mychart3;

class overView extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
        var temp = "以摊余成本计量的金融资产-特殊目的的载体（应计利息）\n" +
            "单位结构性存款\n" +
            "个人结构性存款\n" +
            "投资利息收入\n" +
            "个人存款利息支出\n" +
            "以摊余成本计量的金融资产-特殊目的的载体（面值）\n" +
            "非存款类金融机构存放利息支出\n" +
            "单位存款利息支出\n" +
            "委托存款\n" +
            "个人贷款利息收入";
        var temp2 = "124521003.8\n" +
            "-28712175\n" +
            "-6997577.71\n" +
            "7647.65\n" +
            "-1105522.33\n" +
            "300000000\n" +
            "4297.45\n" +
            "-80311.39\n" +
            "-195679719.2\n" +
            "-1.17";

        myChart1 = echarts.init(document.getElementById('echarts3'));
        myChart1
            .setOption({
                    title: {
                        text: '',
                    },
                    backgroundColor: 'rgb(255 ,255 ,255)',
                    color: 'rgba(238 ,99, 99,0.8)',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        top: 80,
                        bottom: 30
                    },
                    xAxis: {
                        type: 'value',
                        position: 'top',
                        splitLine: {
                            lineStyle: {
                                type: 'dashed'
                            }
                        }
                    },
                    yAxis: {
                        type: 'category',
                        axisLine: {show: false},
                        axisLabel: {show: false},
                        axisTick: {show: false},
                        data: temp.split('\n')
                    },
                    series: [
                        {
                            barWidth: 20,//柱图宽度
                            type: 'bar',
                            label: {
                                show: true,
                                formatter: '{b} : {c}'
                            },
                            data: temp2.split('\n').map(item => {
                                if (Number(item) > 0) {
                                    return {value: item, label: {position: 'left'}}
                                } else {
                                    return {
                                        value: item, label: {position: 'right'}
                                    }
                                }
                            })
                        }
                    ]
                }
            )
        ;


        mychart2 = highcharts.chart('echarts4', {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: [
                    '2021年3月26号',
                    '2021年3月31号'
                ]
            },
            yAxis: [{
                min: 0,
                title: {
                    text: '记录数'
                },
            }],
            legend: {
                shadow: false
            },
            tooltip: {
                shared: true
            },
            plotOptions: {
                column: {
                    grouping: false,
                    shadow: false,
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        allowOverlap: true
                    }
                },
                /* series: {
                     stacking: 'normal'
                 }*/
            },
            series: [{
                name: '外键码值检查',
                color: 'rgba(154,255,154,0.8)',
                data: [150, 146],
                pointPadding: 0.4, // 通过 pointPadding 和 pointPlacement 控制柱子位置
                pointPlacement: -0.3,
            }, {
                name: '外键码值检查通过',
                color: 'rgba(0 ,205, 0,1)',
                data: [120, 138],
                pointPadding: 0.45,
                pointPlacement: -0.3,
            }, {
                name: '空值检查',
                color: 'rgba(135,206,250,0.8)',
                data: [315, 315],
                pointPadding: 0.4,
                pointPlacement: -0.1,
                /*   yAxis: 1  // 指定数据列所在的 yAxis*/
            }, {
                name: '空值检查通过',
                color: 'rgba(30,144,255,1)',
                data: [265, 295],
                pointPadding: 0.45,
                pointPlacement: -0.1,

            },

                {
                    name: '其他特殊规则检查',
                    color: 'rgba(250 ,128 ,114,.8)',
                    data: [29, 29],
                    pointPadding: 0.4,
                    pointPlacement: 0.1,
                },
                {
                    name: '其他特殊规则检查通过',
                    color: 'rgba(205, 85 ,85,1)',
                    data: [21, 21],
                    pointPadding: 0.45,
                    pointPlacement: 0.1,
                    /* yAxis: 1*/
                },
                /* {
                     name: '检查合计',
                     color: 'rgba(250 ,128 ,114,0.3)',
                     data: [666, 666],
                     pointPadding: 0.05,
                     pointPlacement: -0.1,
                     /!* yAxis: 1*!/
                 },
                 {
                     name: '检查通过',
                     color: 'rgba(205, 85 ,85,0.5)',
                     data: [555, 600],
                     pointPadding: 0.1,
                     pointPlacement: -0.1,
                     /!* yAxis: 1*!/
                 },*/
            ]
        });


        mychart3 = highcharts.chart('echarts5', {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: [
                    '2021年3月26号',
                    '2021年3月31号'
                ]
            },
            yAxis: [{
                min: 0,
                title: {
                    text: '记录数'
                },
            }/*,{
                title: {
                    text: '通过率'
                },
                opposite: true
            }*/
            ],
            legend: {
                shadow: false
            },
            tooltip: {
                shared: true
            },
            plotOptions: {
                column: {
                    grouping: false,
                    shadow: false,
                    borderWidth: 0,
                },
                series: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: '外键码值检查',
                color: 'rgba(156, 156 ,156,0.5)',
                data: [150, 146],
                pointPadding: 0.3, // 通过 pointPadding 和 pointPlacement 控制柱子位置
                pointPlacement: 0,
                stack: '检查',
                dataLabels: {
                    enabled: true,
                    allowOverlap: true,
                    x:-83,
                    y:0,
                    style: {     fontSize:"16px",    color : 'black'  }
                }
            }, {
                name: '外键码值检查通过',
                color: 'rgba(79, 79, 79,1)',
                data: [120, 138],
                pointPadding: 0.4,
                pointPlacement: 0,
                stack: '检查通过',
                dataLabels: {
                    enabled: true,
                    allowOverlap: true,
                    x:0,
                    y:0,
                    style: {     fontSize:"18px",    color : 'white'  }
                }
            }, {
                name: '空值检查',
                color: 'rgba(176 ,224, 230,0.5)',
                data: [315, 315],
                pointPadding: 0.3,
                pointPlacement: 0,
                stack: '检查',
                dataLabels: {
                    enabled: true,
                    allowOverlap: true,
                    x:-83,
                    y:0,
                    style: {     fontSize:"16px",    color : 'black'  }
                }
                /*   yAxis: 1  // 指定数据列所在的 yAxis*/
            }, {
                name: '空值检查通过',
                color: 'rgba(70 ,130 ,180,1)',
                data: [265, 295],
                pointPadding: 0.4,
                pointPlacement: 0,
                stack: '检查通过',
                dataLabels: {
                    enabled: true,
                    allowOverlap: true,
                    x:0,
                    y:0,
                    style: {     fontSize:"18px",    color : 'white'  }
                }

            },

                {
                    name: '其他特殊规则检查',
                    color: 'rgba(250 ,128 ,114,.5)',
                    data: [29, 29],
                    pointPadding: 0.3,
                    pointPlacement: 0,
                    stack: '检查',
                    dataLabels: {
                        enabled: true,
                        allowOverlap: true,
                        x:-83,
                        y:0,
                        style: {     fontSize:"16px",    color : 'black'  }
                    }
                },
                {
                    name: '其他特殊规则检查通过',
                    color: 'rgba(205, 85 ,85,1)',
                    data: [21, 21],
                    pointPadding: 0.4,
                    pointPlacement: 0,
                    stack: '检查通过',
                    dataLabels: {
                        enabled: true,
                        allowOverlap: true,
                        x:0,
                        y:0,
                        style: {     fontSize:"18px",    color : 'white'  }
                    }
                    /* yAxis: 1*/
                },
               /* {
                    type: 'spline',
                    name: '其他特殊规则检查',
                    color: 'rgba(205, 85 ,85,1)',
                    data: [Number(21/29), Number(21/29)],
                    marker: {
                        lineWidth: 2,
                        fillColor: 'white'
                    },
                    yAxis: 1  // 指定数据列所在的 yAxis
                }*/
                /* {
                     name: '检查合计',
                     color: 'rgba(250 ,128 ,114,0.3)',
                     data: [666, 666],
                     pointPadding: 0.05,
                     pointPlacement: -0.1,
                     /!* yAxis: 1*!/
                 },
                 {
                     name: '检查通过',
                     color: 'rgba(205, 85 ,85,0.5)',
                     data: [555, 600],
                     pointPadding: 0.1,
                     pointPlacement: -0.1,
                     /!* yAxis: 1*!/
                 },*/
            ]
        });


    }

    render() {
        return (
            <div>
                <div id="echarts3" style={{width: '1150px', height: '600px'}}></div>
                <div id="echarts4" style={{width: '1150px', height: '700px', marginTop: '50px'}}></div>
                <div id="echarts5" style={{width: '1150px', height: '700px', marginTop: '50px'}}></div>
            </div>
        )
    }
}

export default withRouter(overView);
