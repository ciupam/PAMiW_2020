import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, RadioGroup, Radio, FormControlLabel, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';
import qs from 'querystring';

const upper = ["Ą", "Ć", "Ę", "Ł", "Ń", "Ó", "Ś", "Ź", "Ż"];
const lower = ["ą", "ć", "ę", "ł", "ń", "ó", "ś", "ź", "ż"];
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const url = "https://pi.iem.pw.edu.pl";

const validateName = input => {
    if (input !== "") {
        if (input.length === 1) {
            return false;
        }

        if (!upper.includes(input[0]) && (input[0].charCodeAt() < "A".charCodeAt() || input[0].charCodeAt() > "Z".charCodeAt())) {
            return false;
        }

        for (const c of input.slice(1, input.length)) {
            if (!lower.includes(c) && (c.charCodeAt() < "a".charCodeAt() || c.charCodeAt() > "z".charCodeAt())) {
                return false;
            }
        }

        return true;
    }

    return false;
};

const validatePesel = i => {
    if (i !== "") {
        if (i.length !== 11) return false;

        for (const c of i) {
            if (!digits.includes(c)) return false;
        }

        const sum = (9*Number(i[0])+7*Number(i[1])+3*Number(i[2])+Number(i[3])+9*Number(i[4])+7*Number(i[5])+3*Number(i[6])+Number(i[7])+9*Number(i[8])+7*Number(i[9])).toString();

        if(sum[sum.length-1] !== i[10]) return false;

        return true;
    }

    return false;
};

const validatePassword = input => {
    if (input !== "") {
        if (input.length < 8) return false;
        
        for (const c of input) if ((c.charCodeAt() < "A".charCodeAt() || c.charCodeAt() > "Z".charCodeAt()) && (c.charCodeAt() < "a".charCodeAt() || c.charCodeAt() > "z".charCodeAt())) return false;

        return true;
    }
    
    return false;
};

const validateBirthDate = i => {
    const year = Number(i.split("-")[0]);
    if (year < 1990) return false;
    return true;
};

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        display: 'none',
    },
    button: {
        margin: theme.spacing(1),
    },
    weird_input: {
        margin: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    weird_buttons: {
        margin: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    }
}));

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
    const [pesel, setPesel] = useState({
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
    const [date, setDate] = useState({
        value: new Date('2019-11-17'),
        isErr: false
    });
    const [photo, setPhoto] = useState({});
    const [sex, setSex] = useState("M");

    const validateLogin = () => {
        if (login.value === "") setLogin({
            value: "",
            isErr: true
        });
        else {
            axios
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
        }
    };

    const handleSubmit = () => {
        const requestBody = {
            firstname: firstName.value,
            lastname: lastName.value,
            login: login.value,
            password: password.value,
            birthdate: date.value,
            pesel: pesel.value,
            sex,
            photo
        };
        console.log(date.value);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        axios
            .post(`${url}/register`, qs.stringify(requestBody), config)
            .then(res => {
                console.log(res.status);
            })
            .catch(err => {
                console.log(err);
                return null;
            });
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
        setPesel({
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
        setDate({
            value: new Date('2019-11-17'),
            isErr: false
        });
        setPhoto({});
    };

    return (
        <Paper className={classes.paper} square>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>

            <form className={classes.form} encType="multipart/form-data" method="POST" action="https://pi.iem.pw.edu.pl/register">
                <TextField
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
                    required
                    fullWidth
                    label="Pesel"
                    name="pesel"
                    margin="normal"
                    value={pesel.value}
                    onChange={e => setPesel({
                        value: e.target.value,
                        isErr: e.target.error,
                    })}
                    error={pesel.isErr}
                    helperText={pesel.isErr ? "Incorrect pesel." : ""}
                    onBlur={e => {
                        if (!validatePesel(pesel.value)) setPesel({
                            value: e.target.value,
                            isErr: true
                        }); 
                        else setPesel({
                            value: e.target.value,
                            isErr: false
                        });
                    }}
                />

                <TextField
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
                    onBlur={() => validateLogin()}
                />

                <TextField
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

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        required
                        fullWidth
                        label="Your birth date"
                        name="birthdate"
                        margin="normal"
                        format="yyyy-MM-dd"
                        value={date.value}
                        onChange={date => setDate(prev => ({
                            value: date,
                            isErr: prev.isErr
                        }))}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        error={date.isErr}
                        helperText={date.isErr ? "Incorrect date." : ""}
                        onBlur={e => {
                            if (!validateBirthDate(e.target.value)) setDate({
                                value: e.target.value,
                                isErr: true
                            });
                            else setDate({
                                value: e.target.value,
                                isErr: false
                            });
                        }}
                    />
                </MuiPickersUtilsProvider>

                <div className={classes.weird_input}>
                    <input 
                        className={classes.input}
                        id="contained-button-file"
                        type="file"
                        name="photo"
                        value={photo.value}
                        onChange={e => setPhoto(e.target.files[0])}
                    />
                    <label htmlFor="contained-button-file">
                        <Button 
                            variant="contained" 
                            component="span" 
                            className={classes.button}
                        >
                            Upload
                        </Button>
                    </label>

                    <FormControl component="fieldset">
                        <RadioGroup aria-label="sex" name="sex" value={sex} onChange={e => setSex(e.target.value)} row>
                            <FormControlLabel
                                value="M"
                                label="Male"
                                labelPlacement="start"
                                control={<Radio color="primary" />}
                                component="span"
                            />

                            <FormControlLabel
                                value="F"
                                label="Female"
                                labelPlacement="start"
                                control={<Radio color="primary" />}
                                component="span"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>

                <div className={classes.weird_buttons}>
                    <Button
                        onClick={handleReset}
                    >
                        Reset
                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>

            </form>
        </Paper>
    );
};