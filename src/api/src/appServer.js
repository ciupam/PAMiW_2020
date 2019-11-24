const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const PORT = 4000;
// TODO: load and save pdfs to mongo db
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log('Connected!'));

app.use(cors());

app.use(express.json());

app.listen(PORT);