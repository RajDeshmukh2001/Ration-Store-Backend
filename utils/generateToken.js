const jwt = require('jsonwebtoken');

const generateToken = function () {
    return jwt.sign({ _id: this._id },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
    );
}

module.exports = generateToken;