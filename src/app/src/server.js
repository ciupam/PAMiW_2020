import express from 'express';
import userRouter from './routes/user';
import mongoose from 'mongoose';
require('dotenv').config();

const {
    PORT = 4000,
    DB_CONNECTION='mongodb://user:pwd@pamw_just_dev_mongo:27017/mydb',
} = process.env;

(async () => {
    try {
        await mongoose.connect(
            DB_CONNECTION, 
            {useNewUrlParser: true, useUnifiedTopology: true}, 
            err => {
                if (err) console.log(err);
                else console.log('App server connected to db');
            }
        );

        const app = express();
        app.use(express.json());
        app.use('/app/user', userRouter);
        app.listen(PORT, () => console.log(`App server is running on port ${PORT}`));
    } catch (err) {
        console.log(err);
    }
})();