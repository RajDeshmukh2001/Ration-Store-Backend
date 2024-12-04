const mongoose = require('mongoose');

const dbConnection = (URI) => {
    return mongoose.connect(URI);
}

module.exports = dbConnection;