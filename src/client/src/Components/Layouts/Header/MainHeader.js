import React from 'react';
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import useStyles from '../Assets/useStyles';

export default () => { 
    const classes = useStyles();

    return (
        <AppBar position="static" data-test='AppBar'>
            <Toolbar>

                <Typography 
                    variant="h6" 
                    className={classes.title}
                >
                    <Link to='/'>Home</Link>
                </Typography>

                <Link to='/login'>
                    <Button 
                        className={classes.button} 
                        color="inherit"
                    >
                        Login
                    </Button>
                </Link>

                <Link to='/register'>
                    <Button
                        className={classes.button} 
                        variant="contained"
                    >
                        Register
                    </Button>
                </Link>

            </Toolbar>
        </AppBar>
    );
};