import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { logout } from '../../../actions/session';
import useStyles from '../Assets/useStyles';

const mapStateToProps = ({ session }) => ({
    session
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

const LoginHeader = ({ logout, session }) => { 
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography 
                    variant="h6" 
                    className={classes.title}
                >
                    Hi, {session.firstname}!
                </Typography>

                <Button
                    className={classes.button} 
                    variant="contained"
                    onClick={logout}
                >
                    Logout
                </Button>

            </Toolbar>
        </AppBar>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginHeader);