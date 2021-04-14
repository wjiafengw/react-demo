/**
 * @class ExampleComponent
 */

import * as React from 'react'
import {Tag} from 'antd';


var canvas = {};
var ctx = {};
var color = {};
var color_ctx = {};

class ExampleComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            left: 0,
            top: 0,
            cur_list: [],
            r: 0,
            g: 0,
            b: 0,
            render_str: [],
            visible: false
        }
    }

    handleGetImageWidth = (e) => {
        console.log("handleGetImageWidth", e.target.width, e.target.height);
        const scale = this.props.scale || 3
        this.setState({scale_width: e.target.width * scale})
        //背景的图片width比如说为774px 那么放大的那一层的scale_width就应该是774*scale
        //774.43 486.78
        //1324 832
    }

    handleMouseDown = (e) => {
        if (this.state.visible == true) {
            this.state.cur_list.push({
                r: this.state.r,
                g: this.state.g,
                b: this.state.b,
                code: "#" + this.state.r.toString(16).toUpperCase() + this.state.g.toString(16).toUpperCase() + this.state.b.toString(16).toUpperCase()
            });

            var temp_render_str = [];
            for (let i = 0; i < this.state.cur_list.length; i++) {
                temp_render_str.push(<Tag style={{width: '65px', height: '25px', marginTop: '20px',}}
                                          color={this.state.cur_list[i].code}
                                          key={i}> {this.state.cur_list[i].code}   </Tag>);
            }

            this.setState({
                render_str: temp_render_str
            })
        }
    }

    handleMouseEnter = () => {
        this.setState({visible: true})
    }

    handleMouseLeave = () => {
        this.setState({visible: false})
        //canvas每当高度或宽度被重设时，画布内容就会被清空
        color.height = color.height;
    }

    handleMouseMove = (e) => {
        // console.log(e);
        const {offsetX, offsetY} = e.nativeEvent
        this.setState({
            left: offsetX,
            top: offsetY,
        })
        //https://www.cnblogs.com/jdksummer/articles/2565998.html
        var c = ctx.getImageData(offsetX, offsetY, 1, 1).data;
        var red = c[0];
        var green = c[1];
        var blue = c[2];
        if (color) {
            color_ctx.beginPath();
            color_ctx.fillStyle = 'rgb(' + red + ', ' + green + ',' + blue + ')';
            color_ctx.arc(80, 80, 80, 0, Math.PI * 2, false);
            color_ctx.fill();
            this.setState({
                r: c[0],
                g: c[1],
                b: c[2]
            })
        }
    }

    //https://www.cnblogs.com/linx/p/12767074.html

    componentDidMount() {
        canvas = document.getElementById("canvas");
        //2. 获取2D上下文
        ctx = canvas.getContext('2d');
        color = document.getElementById("color");
        if (color) {
            color_ctx = color.getContext('2d');
        }

        //3. 新建一个Image对象
        var img = new Image();
        //4. 设置Image的src
        //https://www.canvasapi.cn/assets/images/examples/500/1.jpg
        //https://pzyfile.oss-cn-hangzhou.aliyuncs.com//6fec2680ea6311e98e5fc1818ef4e028passport1570604847928.jpg
        //webpack --config ./build/webpack.dev.conf.js
        ///D:\Users\xmb-user\WebstormProjects\untitled12\react-demo\dist\static\img\test004.22ac09d.jpg
        //public下
        img.src = "test004.jpg";
        //5. 确定Image加载完毕后将Image画到canvas上
        img.onload = () => {
            ctx.drawImage(img, 0, 0, 2800, 1760, 0, 0, 1324, 832);
            //  console.log(img.width);
            this.setState({scale_width: 1324 * 3})
            console.log("onload")
            // 774.43, 486.78
        }
    }

    render() {
        const {url, width, height} = this.props
        const {left, top, scale_width} = this.state
        const scale = this.props.scale || 3
        return (
            <>
                {/*  <canvas id="canvas"  width="1400" height="880">对不你，你的浏览器不支持Canvas</canvas>*/}{/*
                和直接style={{wdith:'2800px';height:'1400px'}}有区别*/}
                {/* 不加position:'absolute'这个屏幕缩放他会根据大的div进行绝对定位，将会有偏差,但是加了之后整体脱离文档流，下面footer会上移*/}
                <div
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    onMouseMove={this.handleMouseMove}
                    onMouseDown={this.handleMouseDown}
                    /*   style={{'position':'absolute'}}>*/
                >
                    <canvas id="canvas" width="1324" height="832">对不起，你的浏览器不支持Canvas</canvas>
                    <canvas id="color" width="160" height="160" style={{
                        position: "absolute",
                        left: left - 80,
                        top: top - 80,
                        overflow: 'hidden',
                        pointerEvents: 'none',//解决了闪烁问题
                        zIndex: 1
                    }}>对不起，你的浏览器不支持Canvas
                    </canvas>
                    {/*  <img onLoad={this.handleGetImageWidth} alt='' src={url} style={{
                        width: '100%',
                        height: '100%'
                    }}/>*/}
                    {this.state.visible && <div style={{
                        position: 'absolute',
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        boxSizing: 'border-box',
                        /* border: '1px solid #ffffff',*/
                        background: '#eee',
                        pointerEvents: 'none',
                        overflow: 'hidden',
                        zIndex: 1,
                        left: left - 60,
                        top: top - 60,
                    }}>
                        <img
                            alt=''
                            src={url}
                            style={{
                                width: scale_width,
                                position: "absolute",
                                left: 60 - (left * scale),
                                top: 60 - (top * scale)
                            }}
                        />
                    </div>}
                </div>
                <div style={{width: '1324px'}}>
                    {this.state.render_str}
                </div>
            </>
        )
    }
}

export default ExampleComponent;


