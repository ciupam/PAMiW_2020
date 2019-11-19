import React, { useState } from 'react';
import { Paper, Typography, Button, TextField } from '@material-ui/core';
import useStyles from './Assets/useStyles';

export default props => {
    const classes = useStyles();

    const [login, setLogin] = useState({
        value: "",
        isErr: false
    });

    const [password, setPassword] = useState({
        value: "",
        isErr: false
    });

    return (
        <Paper className={classes.paper} square>
            <Typography component="h1" variant="h5">
                Sign In
            </Typography>

            <form className={classes.form}>
                <TextField
                        className={classes.text_field}
                        required
                        fullWidth
                        label="Login"
                        name="login"
                        margin="normal"
                        autoFocus
                        value={login.value}
                        onChange={e => setLogin({
                            value: e.target.value,
                            isErr: e.target.error,
                        })}
                        error={login.isErr}
                        helperText={login.isErr ? "Login is taken." : ""}
                    />

                    <TextField
                        className={classes.text_field}
                        required
                        fullWidth
                        label="Password"
                        name="password"
                        margin="normal"
                        type="password"
                        value={password.value}
                        onChange={e => setPassword({
                            value: e.target.value,
                            isErr: e.target.error
                        })}
                        error={password.isErr}
                        helperText={password.isErr ? "Incorrect password." : ""}
                />

                <div className={classes.weird_buttons}>
                        <Button
                        >
                            Reset
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                        >
                            Login
                        </Button>
                </div>
            </form>
            
        </Paper>
    );
};