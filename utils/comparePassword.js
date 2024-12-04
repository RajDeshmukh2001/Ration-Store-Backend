const bcrypt = require('bcrypt');

const comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = comparePassword;