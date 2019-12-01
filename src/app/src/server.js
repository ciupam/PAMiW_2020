import express from 'express';
import userRouter from './routes/user';
require('dotenv').config();

const {
    PORT = 4000,
} = process.env;

const app = express();
app.use(express.json());
app.use('/app/user', userRouter);

app.listen(PORT, () => console.log(`App server is running on port ${PORT}`));