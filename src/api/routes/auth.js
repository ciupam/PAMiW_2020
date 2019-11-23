const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../models/validateUser');

let refreshTokens = [];

router.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = { firstname, lastname, login } = req.body;

    const loginExists = await User.findOne({ login });
    if (loginExists) return res.status(400).send('Login already exists.');

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashPassword;

    try {
        const savedUser = await new User(user).save();
        res.status(201).send({ user: savedUser._id });
    } catch(err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { login, password } = req.body;
    
    const user = await User.findOne({ login });
    if (!user) return res.status(400).send('Login does not exist.');
    
    const validPass = await bcrypt.compare(password, user.password);
    if(!validPass) return res.status(400).send('Invalid password.');

    const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
    const refreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    res.send({ accessToken, refreshToken });
});

router.get('/find/:userLogin', async (req, res) => {
    const loginExists = await User.findOne({ login: req.params.userLogin });
    if (loginExists) res.status(400).send('Login already exists.');
    else res.status(200).send('This login is free to go.');
});

router.post('/token', (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.sendStatus(401);

    // sprawdzamy refresh token w bazie -- REDIS!!!!!
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
        res.send({ accessToken });
    });
});

module.exports = router;
