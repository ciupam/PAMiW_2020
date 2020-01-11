import express from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { registerValidation, loginValidation, usernameValidation } from '../models/validateUser';

const userRouter = express.Router();

const parseError = err => JSON.stringify(err, Object.getOwnPropertyNames(err));
 
userRouter.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0]);

    const { firstname, lastname, login, email } = req.body;
    const user = { firstname, lastname, login, email };

    try {
        const loginExists = await User.findOne({ login });
        const emailExists = await User.findOne({ email });
        if (loginExists) return res.status(400).send(parseError(new Error('"login" already exists')));
        if (emailExists) return res.status(400).send(parseError(new Error('"email" already exists')));
    } catch(err) {
        return res.status(500).send(err);
    }
    
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashPassword;

    try {
        const savedUser = await new User(user).save();
        res.status(201).send({ user: savedUser._id });
    } catch(err) {
        res.status(500).send(err);
    }
});

userRouter.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0]);

    const { login, password } = req.body;
    
    try {
        var user = await User.findOne({ login });
        if (!user) return res.status(401).send(parseError(new Error('"login" or "password" is incorrect')));
        const validPass = await bcrypt.compare(password, user.password);
        if(!validPass) return res.status(401).send(parseError(new Error('"login" or "password" is incorrect')));
    } catch(err) {
        return res.status(500).send(err);
    }

    const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
    const refreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET);
    const sessionUser = { userId: user._id, firstname: user.firstname, accessToken, refreshToken };
    req.session.user = sessionUser;
    res.send(sessionUser);
});
 
userRouter.get('/find/:userLogin', async (req, res) => {
    const { error } = usernameValidation({ login: req.params.userLogin });
    if (error) return res.status(400).send(error.details[0]);

    try {
        const loginExists = await User.findOne({ login: req.params.userLogin });
        if (loginExists) res.status(400).send(parseError(new Error('"login" already exists')));
        else res.sendStatus(200);
    } catch(err) {
        res.status(500).send(err);
    }
});

userRouter.post('/token', (req, res) => {
    const refreshToken = req.body.token;
    const user = req.session.user;
    if (!refreshToken || !user) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
        res.send({ accessToken });
    });
});
 
userRouter.delete('/logout', ({ session }, res) => {
    try {
        const user = session.user;
        if (user) {
            session.destroy(err => {
                if (err) throw (err);
                res.clearCookie(process.env.SESS_NAME);
                res.send(user);
            });
        } else {
            throw new Error('Something went wrong');
        }
    } catch(err) {
        res.status(422).send(parseError(err));
    }
});

userRouter.get('', ({ session: { user } }, res) => {
    res.send({ user });
});

export default userRouter;