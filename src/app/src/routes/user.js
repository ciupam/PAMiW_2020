import express from 'express';
import verifyToken from './utils/verifyToken';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import Post from '../models/Post';
import validatePost from '../models/validatePost';

const userRouter = express.Router();

userRouter.get('/:userId', verifyToken, (req, res) => { // get an array of files from the user dir
    const uploadDir = `${__dirname}/uploads/${req.user._id}`;
    const uploads = [];
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    else fs.readdirSync(uploadDir).forEach(file => uploads.push({
        file: `/app/user/${req.user._id}/${file}`,
        name: file
    }));
    res.send(uploads);
});

userRouter.post('/:userId', verifyToken, (req, res) => { // post a new file to the user dir
    const form = new IncomingForm();
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024;

    const uploadDir = `${__dirname}/uploads/${req.user._id}`;
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    
    form.parse(req);

    form.on('fileBegin', (field, file) => {
        file.path = `${uploadDir}/${file.name}`;
    });

    form.on('file', (field, file) => {
        res.send({
            file: `/app/user/${req.user._id}/${file.name}`,
            name: file.name
        });
    });
});

userRouter.get('/:userId/:fileName', verifyToken, (req, res) => { // get a specific file from the user dir
    const filePath = `${__dirname}/uploads/${req.user._id}/${req.params.fileName}`;
    if (!fs.existsSync(filePath)) return res.status(400).send('No file or user in a storage.');
    res.download(filePath);
});

userRouter.get('/token', verifyToken, (req, res) => {
    res.status(200).send('OK');
});

userRouter.post('/post', verifyToken, async (req, res) => {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error.details[0]);

    const { files, _public, firstname, lastname } = req.body;
    const post = { files, _public, firstname, lastname, userId: req.user._id };

    try {
        const savedPost = await new Post(post).save();
        res.status(201).send({ post: savedPost._id });
    } catch(err) {
        res.status(500).send(err);
    }
});

userRouter.get('/post', verifyToken, async (req, res) => {
    const userId = req.user._id;

    try {
        const userPosts = await Post.find({ userId });
        return res.status(200).send(userPosts);
    } catch(err) {
        return res.status(500).send(err);
    }
});

export default userRouter;