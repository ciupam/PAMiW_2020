import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const authHeader = req.header('authorization');
    const accessToken = authHeader && authHeader.split(' ')[1];
    if (!accessToken) return res.sendStatus(401);

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};