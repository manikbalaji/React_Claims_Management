import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Components/Login.jsx';
import ClaimSummary from './Components/ClaimSummary.jsx';
import Home from './Components/Home.jsx';
import About from './Components/About.jsx';
import ContactUs from './Components/ContactUs.jsx';
import Sample from './Components/Sample.jsx';
import AppRouter from './Components/AppRouter.jsx';
import { Route, Router, browserHistory, Switch, withRouter } from 'react-router';
import Menu from './Components/Menu.jsx';
// import './CSS/Login.css';

//ReactDOM.render(<Login/>,document.getElementById('app'));
//ReactDOM.render(<ClaimSummary/>,document.getElementById('app'));
//ReactDOM.render(<Sample/>,document.getElementById('app'));

//ReactDOM.render(<AppRouter/>,document.getElementById('app'));

ReactDOM.render((
    <Router history = {browserHistory}>
            <Route path="/ClaimSummary" component={ClaimSummary}>
            </Route>
            <Route path="/Home" component={Home}>
            </Route>
            <Route path="/About" component={About}>
            </Route>
            <Route path="/ContactUs" component={ContactUs}>
            </Route>
            <Route exact path="/Login" component={Login}>
            </Route>
            <Route exact path="/" component={Login}>
            </Route>
   </Router>
),document.getElementById('app'));