import React from "react";
import {withRouter} from 'react-router-dom';
import ExampleComponent from './ExampleComponent.js'


class Magnifier extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {

        //-157 0
      /*  console.log(document.getElementById("magnifier").offsetLeft);
        console.log(document.getElementById("magnifier").offsetTop);*/
    }

    render() {
        return (
            <div id="magnifier">
                <ExampleComponent
                    url='https://pzyfile.oss-cn-hangzhou.aliyuncs.com//6fec2680ea6311e98e5fc1818ef4e028passport1570604847928.jpg'
                />
            </div>
        )
    }
}

export default withRouter(Magnifier);
