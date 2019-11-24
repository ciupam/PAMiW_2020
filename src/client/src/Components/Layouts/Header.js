import React from 'react';
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

    return (
        <AppBar position="static">
            <Toolbar>

                <Typography 
                    variant="h6" 
                    className={classes.title}
                >
                    Hello
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