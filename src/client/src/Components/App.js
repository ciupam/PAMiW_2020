import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { Login, Register, Home, LoginHeader, MainHeader, Drawer } from './Layouts';
import { connect } from 'react-redux';
import { AuthRoute, ProtectedRoute } from '../util/route';

const mapStateToProps = ({ session: { userId } }) => ({
    loggedIn: Boolean(userId) 
});

const App = ({ loggedIn }) => (
    <Router>
        { loggedIn ? <LoginHeader /> : <MainHeader />}
        <Switch>
            <Route exact path='/' component={Home} />
            <AuthRoute path='/login' component={Login} />
            <AuthRoute path='/register' component={Register} />
            <ProtectedRoute path='/drawer' component={Drawer} />
        </Switch>
    </Router>
);

export default connect(mapStateToProps)(App);