import React from 'react'
import { Paper, TextField } from '@material-ui/core'
import useStyles from './Assets/useStyles'

export default () => {
    const classes = useStyles()

    const handleSubmit = e => {
        e.preventDefault()
    }

    return (
        <Paper className={classes.paper} square>
            <form classes={classes.form} onSubmit={handleSubmit}>
                <TextField
                    className={classes.text_field}
                    label="Email"
                    name="email"
                    margin="normal"
                    autoFocus
                />
            </form>
        </Paper>
    )
}
