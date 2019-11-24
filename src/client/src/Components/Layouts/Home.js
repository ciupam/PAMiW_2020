import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import useStyles from './Assets/useStyles';
import Header from './Header';

export default props => {
    const classes = useStyles();

    return (
        <>
            <Header />
            <Paper className={classes.paper} square>
                <Typography variant="h2" align="center">
                    Welcome to the home page.
                </Typography>
            </Paper>
        </>
    );
};