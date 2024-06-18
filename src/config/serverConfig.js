const dotenv = require('dotenv');
const bycrypt = require('bcrypt')

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    SALT: bycrypt.genSaltSync(10)
}