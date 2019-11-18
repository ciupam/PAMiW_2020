import React from 'react';
import { Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
    },
}));

export default props => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper} square>
            <Typography variant="h2" align="center">
                Welcome to the home page.
            </Typography>
        </Paper>
    );
};