const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());

const postsRoute = require('./routes/users');

app.use('/user', postsRoute);

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => res.send("hejka"));

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log('Connected!'));

app.listen(PORT);