import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import useStyles from './Assets/useStyles'

export default () => (
    <Paper className={useStyles().paper} square>
        <Typography variant="h2" align="center">
            Yet another home page page
        </Typography>
    </Paper>
)
