import React, { useState } from 'react';
import { Link } from 'react-router-dom'
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

export default props => { 
    const classes = useStyles();

    const [loginActive, setLoginActive] = useState(false);
    const [registerActive, setRegisterActive] = useState(false);

    return (
        <AppBar position="static">
            <Toolbar>

                <Typography 
                    variant="h6" 
                    className={classes.title} 
                    onClick={e => {
                        setLoginActive(false);
                        setRegisterActive(false);
                    }}
                >
                    <Link to='/'>Hello</Link>
                </Typography>

                <Link to='/login'>
                    <Button 
                        className={classes.button} 
                        color="inherit" 
                        disabled={loginActive} 
                        onClick={e => {
                            setLoginActive(true);
                            setRegisterActive(false);
                        }}
                    >
                        Login
                    </Button>
                </Link>

                <Link to='/register'>
                    <Button
                        className={classes.button} 
                        variant="contained"
                        disabled={registerActive} 
                        onClick={e => {
                            setRegisterActive(true);
                            setLoginActive(false);
                        }}
                    >
                        Register
                    </Button>
                </Link>

            </Toolbar>
        </AppBar>
    );
}