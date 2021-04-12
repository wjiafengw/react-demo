/**
 * @class ExampleComponent
 */

import * as React from 'react'


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

    handleMouseEnter = () => {
        this.setState({visible: true})
    }

    handleMouseLeave = () => {
        this.setState({visible: false})
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


        color_ctx.beginPath();
        color_ctx.fillStyle = 'rgb(' + red + ', ' + green + ',' + blue + ')';
        color_ctx.arc(60, 60, 60, 0, Math.PI * 2, false);
        color_ctx.fill();

        console.log(red, green, blue);


    }

    //https://www.cnblogs.com/linx/p/12767074.html

    componentDidMount() {

        canvas = document.getElementById("canvas");
        color = document.getElementById("color");
        //2. 获取2D上下文
        ctx = canvas.getContext('2d');
        color_ctx = color.getContext('2d');
        //3. 新建一个Image对象
        var img = new Image();
        //4. 设置Image的src
        //https://www.canvasapi.cn/assets/images/examples/500/1.jpg
        //https://pzyfile.oss-cn-hangzhou.aliyuncs.com//6fec2680ea6311e98e5fc1818ef4e028passport1570604847928.jpg


        //webpack --config ./build/webpack.dev.conf.js
        ///D:\Users\xmb-user\WebstormProjects\untitled12\react-demo\dist\static\img\test004.22ac09d.jpg
        //public下
        img.src = "test004.jpg";

        console.log(img);
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
                <div
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    onMouseMove={this.handleMouseMove}
                >
                    <canvas id="canvas" width="1324" height="832">对不你，你的浏览器不支持Canvas</canvas>
                    <canvas id="color" width="120" height="120" style={{
                        position: "absolute",
                        left: left + 120,
                        top: top -60,
                    }}>对不你，你的浏览器不支持Canvas
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
                        border: '2px solid #FFF',
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
            </>
        )
    }
}

export default ExampleComponent;


