import React, { useState } from 'react';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { validateName, validatePassword } from './Assets/validateInput';
import useStyles from './Assets/useStyles';
import { connect } from 'react-redux';
import { register } from '../../actions/session';
import Header from './Header';
import axios from 'axios';

const mapStateToProps = ({ errors }) => ({
    errors
});

const mapDispatchToProps = dispatch => ({
    register: user => dispatch(register(user))
});

const Register = ({ errors, register }) => {
    const classes = useStyles();

    const [firstName, setFirstName] = useState({
        value: "",
        isErr: false,
        helperText: ""
    });
    const [lastName, setLastName] = useState({
        value: "",
        isErr: false,
        helperText: ""
    });
    const [login, setLogin] = useState({
        value: "",
        isErr: false,
        helperText: ""
    });
    const [password, setPassword] = useState({
        value: "",
        isErr: false,
        helperText: ""
    });

    const validateLogin = async e => {
        if (e.target.value === "") setLogin({
            value: "",
            isErr: false,
            helperText: ""
        });
        else {
            const options = {
                url: `/api/user/find/${e.target.value}`,
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            };

            try {
                await axios(options);
            } catch(err) {
                setLogin(prev => ({
                    value: prev.value,
                    isErr: true,
                    helperText: err.response.data
                }));
            }
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        const user = {
            firstname: firstName.value,
            lastname: lastName.value,
            login: login.value,
            password: password.value
        };
        register(user);
    };

    const handleReset = () => {
        setFirstName({
            value: "",
            isErr: false,
            helperText: ""
        });
        setLastName({
            value: "",
            isErr: false,
            helperText: ""
        });
        setLogin({
            value: "",
            isErr: false,
            helperText: ""
        });
        setPassword({
            value: "",
            isErr: false,
            helperText: ""
        });
    };

    return (
        <>
            <Header />

            <Paper className={classes.paper} square>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>

                <p>{errors}</p>

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
                            isErr: e.target.error,
                            helperText: e.target.helperText
                        })}
                        error={firstName.isErr}
                        helperText={firstName.helperText}
                        onBlur={e => {
                            const result = validateName(e.target.value);
                            if (result) setFirstName({
                                value: e.target.value,
                                isErr: true,
                                helperText: result
                            });
                            else setFirstName({
                                value: e.target.value,
                                isErr: false,
                                helperText: ""
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
                            isErr: e.target.error,
                            helperText: e.target.helperText
                        })}
                        error={lastName.isErr}
                        helperText={lastName.helperText}
                        onBlur={e => {
                            const result = validateName(e.target.value);
                            if (result) setLastName({
                                value: e.target.value,
                                isErr: true,
                                helperText: result
                            });
                            else setLastName({
                                value: e.target.value,
                                isErr: false,
                                helperText: ""
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
                            helperText: e.target.helperText
                        })}
                        error={login.isErr}
                        helperText={login.helperText}
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
                            isErr: e.target.error,
                            helperText: e.target.helperText
                        })}
                        error={password.isErr}
                        helperText={password.helperText}
                        onBlur={e => {
                            const result = validatePassword(e.target.value);
                            if (result) setPassword({
                                value: e.target.value,
                                isErr: true,
                                helperText: result
                            }); 
                            else setPassword({
                                value: e.target.value,
                                isErr: false,
                                helperText: ""
                            });
                        }}
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
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </div>

                </form>
            </Paper>
        </>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);