import React from 'react';
import { Route, Router, BrowserRouter, Switch, withRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ClaimSummary from './ClaimSummary.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import About from './About.jsx';
import ContactUs from './ContactUs.jsx';

const history = createBrowserHistory();
const routes = (
        <Switch>
            <Route path="/ClaimSummary" component={withRouter(ClaimSummary)}>
            </Route>
            <Route path="/Home" component={withRouter(Home)}>
            </Route>
            <Route path="/About" component={withRouter(About)}>
            </Route>
            <Route path="/ContactUs" component={withRouter(ContactUs)}>
            </Route>
            <Route exact path="/" component={withRouter(Login)}>
            </Route>
        </Switch>
        )
class App extends React.Component {
  render() {
    return ( 
    <Router history={history}>
      {routes} 
    </Router>)
    }
}

export default App