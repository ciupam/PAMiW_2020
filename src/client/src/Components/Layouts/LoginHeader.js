import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { logout } from '../../actions/session';

const mapStateToProps = ({ session }) => ({
    session
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const LoginHeader = ({ logout, session }) => { 
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>

                <Typography 
                    variant="h6" 
                    className={classes.title}
                >
                    Hi {session.firstname}
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