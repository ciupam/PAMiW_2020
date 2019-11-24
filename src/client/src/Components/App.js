import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { Login, Register, Home, Dashboard } from './Layouts';
import { AuthRoute, ProtectedRoute } from '../util/route';

const App = () => {

    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Home} />
                <AuthRoute path='/login' component={Login} />
                <AuthRoute path='/register' component={Register} />
                <ProtectedRoute path='/dashboard' component={Dashboard} />
            </Switch>
        </Router>
    );
}

export default App;