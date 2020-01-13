import express from 'express';
import verifyToken from './utils/verifyToken';
import Post from '../models/Post';
import validatePost from '../models/validatePost';

const postRouter = express.Router();

postRouter.post('', verifyToken, async (req, res) => {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error.details[0]);

    const { files, _public, firstname, lastname, title } = req.body;
    const post = { files, _public, firstname, lastname, userId: req.user._id, title };

    try {
        const savedPost = await new Post(post).save();
        res.status(201).send(savedPost);
    } catch(err) {
        res.status(500).send(err);
    }
});

postRouter.get('', async (req, res) => {
    try {
        const publicPosts = await Post.find({ _public: true });
        return res.status(200).send(publicPosts);
    } catch(err) {
        return res.status(500).send(err);
    }
});

postRouter.get('/:userId', verifyToken, async (req, res) => {
    const userId = req.user._id;

    try {
        const userPosts = await Post.find({ userId });
        return res.status(200).send(userPosts);
    } catch(err) {
        return res.status(500).send(err);
    }
});

postRouter.delete('/:postId', verifyToken, async (req, res) => {
    const userId = req.user._id;

    try {
        await Post.deleteOne({ userId, _id: req.params.postId });
        return res.status(200).send('OK');
    } catch(err) {
        return res.status(500).send(err);
    }
});

export default postRouter;