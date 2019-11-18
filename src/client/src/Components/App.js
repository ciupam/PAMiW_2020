import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Header, Login, Register, Home } from './Layouts';

export default props => (
    <Router>
        <Header />
        <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/' component={Home} />
        </Switch>
    </Router>
);