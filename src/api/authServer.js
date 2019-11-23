const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require('./routes/auth');
require('dotenv').config();

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log('Connected!'));

app.use(cors());

app.use(express.json());

app.use('/api/user', authRoute);

app.listen(PORT);