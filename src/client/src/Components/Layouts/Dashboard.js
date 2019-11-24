import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import useStyles from './Assets/useStyles';
import LoginHeader from './LoginHeader';

export default props => {
    const classes = useStyles();

    return (
        <>
            <LoginHeader />
            <Paper className={classes.paper} square>
                <Typography variant="h2" align="center">
                    Welcome to the home page.
                </Typography>
            </Paper>
        </>
    );
};