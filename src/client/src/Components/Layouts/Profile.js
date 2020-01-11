import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import useStyles from './Assets/useStyles'

export default () => {
    const classes = useStyles()
    return (
        <Paper className={classes.paper} square>
            <Typography variant="h2" align="center">
                Profile page
            </Typography>
        </Paper>
    )
}