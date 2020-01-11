import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Paper, Typography, TextField, Button } from '@material-ui/core'
import { validateName, validatePassword } from './Assets/validateInput'
import useStyles from './Assets/useStyles'
import { connect } from 'react-redux'
import { register } from '../../actions/session'
import { clearErrors } from '../../actions/error'

const mapStateToProps = ({ errors }) => ({ errors })

const mapDispatchToProps = dispatch => ({ 
    register: user => dispatch(register(user)),
    clearErrors: () => dispatch(clearErrors())
})

const Register = ({ errors, register, clearErrors }) => {
    useEffect(() => {
        clearErrors()
    }, [clearErrors])
    const classes = useStyles()
    const [didRegister, setDidRegister] = useState(false)
    const [firstName, setFirstName] = useState({
        value: '',
        isErr: false,
        helperText: ''
    })
    const [lastName, setLastName] = useState({
        value: '',
        isErr: false,
        helperText: ''
    })
    const [login, setLogin] = useState({
        value: '',
        isErr: false,
        helperText: ''
    })
    const [password, setPassword] = useState({
        value: '',
        isErr: false,
        helperText: ''
    })
    const [email, setEmail] = useState('')

    const handleSubmit = async event => {
        event.preventDefault()
        const user = {
            firstname: firstName.value,
            lastname: lastName.value,
            login: login.value,
            password: password.value,
            email
        }
        await register(user)
        if (!errors) setDidRegister(true)
    }

    const handleReset = () => {
        setFirstName({
            value: '',
            isErr: false,
            helperText: ''
        })
        setLastName({
            value: '',
            isErr: false,
            helperText: ''
        })
        setLogin({
            value: '',
            isErr: false,
            helperText: ''
        })
        setPassword({
            value: '',
            isErr: false,
            helperText: ''
        })
    }

    return (
        <>
            {didRegister ? <Redirect to="/login" /> : null}
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
                            })
                            else setFirstName({
                                value: e.target.value,
                                isErr: false,
                                helperText: ""
                            })
                        }}
                    />

                    <TextField
                        className={classes.text_field}
                        required
                        fullWidth
                        label="Last name"
                        name="lastname"
                        margin="normal"
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
                        onChange={e => setLogin({
                            value: e.target.value,
                            isErr: e.target.error,
                            helperText: e.target.helperText
                        })}
                        error={login.isErr}
                        helperText={login.helperText}
                    />

                    <TextField
                        className={classes.text_field}
                        required
                        fullWidth
                        label="Password"
                        name="password"
                        margin="normal"
                        type="password"
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
                            })
                            else setPassword({
                                value: e.target.value,
                                isErr: false,
                                helperText: ""
                            })
                        }}
                    />

                    <TextField 
                        className={classes.text_field}
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        margin="normal"
                        type="email"
                        helperText={errors}
                        onChange={e => setEmail(e.target.value)}
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
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)