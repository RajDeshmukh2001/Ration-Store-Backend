const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;

        if (!token) {
            req.account = null;
            req.token = null;
            return next();
        }

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const [user, admin] = await Promise.all([
            User.findOne({ _id: verifyToken._id }).select('-password'),
            Admin.findOne({ _id: verifyToken._id, isAdmin: true }).select('-password')
        ]);

        const account = user === null ? admin : user;

        if (!account) {
            throw new Error('User not found');
        }

        req.account = account;
        req.token = token;

        next();
    } catch (error) {
        res.status(500).json({ message: 'Unauthorized access', error });
    }
}

module.exports = auth;