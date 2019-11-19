import React, { useState } from 'react';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { validateName, validatePassword } from './Assets/validateInput';
import useStyles from './Assets/useStyles';
import axios from 'axios';

export default props => {
    const classes = useStyles();

    const [firstName, setFirstName] = useState({
        value: "",
        isErr: false
    });
    const [lastName, setLastName] = useState({
        value: "",
        isErr: false
    });
    const [login, setLogin] = useState({
        value: "",
        isErr: false
    });
    const [password, setPassword] = useState({
        value: "",
        isErr: false
    });

    const validateLogin = () => {
        if (login.value === "") setLogin({
            value: "",
            isErr: true
        });
        else {
        /*    axios
                .get(`${url}/user/${login.value}`)
                .then(res => {
                    if (res.status === 200) setLogin(prev => ({
                        value: prev.value,
                        isErr: true
                    }));
                })
                .catch(err => {
                    console.log(err);
                    return null;
                });
        */
        }
    };

    const handleReset = () => {
        setFirstName({
            value: "",
            isErr: false
        });
        setLastName({
            value: "",
            isErr: false
        });
        setLogin({
            value: "",
            isErr: false
        });
        setPassword({
            value: "",
            isErr: false
        });
    };

    return (
        <Paper className={classes.paper} square>
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>

            <form className={classes.form}>
                <TextField
                    className={classes.text_field}
                    required
                    fullWidth
                    label="First name"
                    name="firstname"
                    margin="normal"
                    autoFocus
                    value={firstName.value}
                    onChange={e => setFirstName({
                        value: e.target.value,
                        isErr: e.target.error
                    })}
                    error={firstName.isErr}
                    helperText={firstName.isErr ? "Incorrect first name." : ""}
                    onBlur={e => {
                        if (!validateName(firstName.value)) setFirstName({
                            value: e.target.value,
                            isErr: true
                        });
                        else setFirstName({
                            value: e.target.value,
                            isErr: false
                        });
                    }}
                />

                <TextField
                    className={classes.text_field}
                    required
                    fullWidth
                    label="Last name"
                    name="lastname"
                    margin="normal"
                    value={lastName.value}
                    onChange={e => setLastName({
                        value: e.target.value,
                        isErr: e.target.error
                    })}
                    error={lastName.isErr}
                    helperText={lastName.isErr ? "Incorrect last name." : ""}
                    onBlur={e => {
                        if (!validateName(lastName.value)) setLastName({
                            value: e.target.value,
                            isErr: true
                        }); 
                        else setLastName({
                            value: e.target.value,
                            isErr: false
                        });
                    }}
                />

                <TextField
                    className={classes.text_field}
                    required
                    fullWidth
                    label="Login"
                    name="login"
                    margin="normal"
                    value={login.value}
                    onChange={e => setLogin({
                        value: e.target.value,
                        isErr: e.target.error,
                    })}
                    error={login.isErr}
                    helperText={login.isErr ? "Login is taken." : ""}
                    onBlur={validateLogin}
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
                    onBlur={e => {
                        if (!validatePassword(password.value)) setPassword({
                            value: e.target.value,
                            isErr: true
                        }); 
                        else setPassword({
                            value: e.target.value,
                            isErr: false
                        });
                    }}
                />

                <TextField
                    className={classes.text_field}
                    required
                    fullWidth
                    label="Retype password"
                    margin="normal"
                    type="password"
                />

                <div className={classes.weird_buttons}>
                    <Button
                        onClick={handleReset}
                    >
                        Reset
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                    >
                        Submit
                    </Button>
                </div>

            </form>
        </Paper>
    );
};