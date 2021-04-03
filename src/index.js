import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from 'redux'
import reportWebVitals from './reportWebVitals';
import leftMenuReducer from './reducers/leftMenuReducer'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import Login from "./component/login";
import Signup from "./component/signup";


const store = createStore(leftMenuReducer)

const render = () => ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/" exact>
                <App style={{height: '100%'}} value={store.getState()}
                     changeName={() => store.dispatch({type: 'CHANGE'})}
                     changeBack={() => store.dispatch({type: 'CHANGEBACK'})}/>
            </Route>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
        </Switch>
    </Router>
    ,
    document.getElementById('root')
)
render();
store.subscribe(render)
reportWebVitals();
