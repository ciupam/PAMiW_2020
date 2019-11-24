import React, { useState } from 'react';
import { Paper, Typography, Button, TextField } from '@material-ui/core';
import useStyles from './Assets/useStyles';
import { connect } from 'react-redux';
import { login } from '../../actions/session';
import Header from './Header';

const mapStateToProps = ({ errors }) => ({
    errors
});

const mapDispatchToProps = dispatch => ({
    login: user => dispatch(login(user))
});

const Login = ({ errors, login }) => {
    const classes = useStyles();

    const [loginValue, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleReset = () => {
        setLogin("");
        setPassword("");
    };

    const handleSubmit = event => {
        event.preventDefault();
        const user = { login: loginValue, password };
        login(user);
    };

    return (
        <>
            <Header />

            <Paper className={classes.paper} square>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>

                <p>{errors}</p>

                <form className={classes.form}>
                    <TextField
                            className={classes.text_field}
                            required
                            fullWidth
                            label="Login"
                            name="login"
                            margin="normal"
                            autoFocus
                            value={loginValue}
                            onChange={e => setLogin(e.target.value)}
                        />

                        <TextField
                            className={classes.text_field}
                            required
                            fullWidth
                            label="Password"
                            name="password"
                            margin="normal"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
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
                                Login
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
)(Login);