import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export default withRouter(props => { 
    const classes = useStyles();

    const handleMount = () => {
        const path = props.location.pathname;
        if (path === '/register') setRegister();
        else if (path === '/login') setLogin();
    };

    useEffect(handleMount, []);

    const [loginActive, setLoginActive] = useState(false);
    const [registerActive, setRegisterActive] = useState(false);

    const setRegister = () => {
        setLoginActive(false);
        setRegisterActive(true);
    };

    const setLogin = () => {
        setLoginActive(true);
        setRegisterActive(false);
    };

    const setHome = () => {
        setLoginActive(false);
        setRegisterActive(false);
    };

    return (
        <AppBar position="static">
            <Toolbar>

                <Typography 
                    variant="h6" 
                    className={classes.title} 
                    onClick={setHome}
                >
                    <Link to='/'>Hello</Link>
                </Typography>

                <Link to='/login'>
                    <Button 
                        className={classes.button} 
                        color="inherit" 
                        disabled={loginActive} 
                        onClick={setLogin}
                    >
                        Login
                    </Button>
                </Link>

                <Link to='/register'>
                    <Button
                        className={classes.button} 
                        variant="contained"
                        disabled={registerActive} 
                        onClick={setRegister}
                    >
                        Register
                    </Button>
                </Link>

            </Toolbar>
        </AppBar>
    );
});