const dotenv = require('dotenv');
const bycrypt = require('bcrypt')

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    SALT: bycrypt.genSaltSync(10),
    JWT_KEY: process.env.JWT_KEY
}