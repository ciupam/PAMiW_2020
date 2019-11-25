const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const connectStore = require('connect-mongo');
const userAuth = require('./routes/auth');
require('dotenv').config();

const app = express();
const apiRouter = express.Router();
const MongoStore = connectStore(session);

const {
    PORT = 8080,
    DB_CONNECTION,
    SESS_SECRET="secret",
    SESS_NAME="sid",
    ACCESS_TOKEN_SECRET="access",
    REFRESH_TOKEN_SECRET="refresh"
} = process.env;

app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    name: SESS_NAME,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        sameSite: true
    },
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: 'session',
        ttl: 60 * 60 * 2
    })
}));

app.use('/api', apiRouter);

apiRouter.use('/user', userAuth);

mongoose.connect(DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log('Connected!'));

app.listen(PORT, () => console.log());