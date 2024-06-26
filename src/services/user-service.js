const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken'); 
const {JWT_KEY} = require('../config/serverConfig');
const bcrypt = require('bcrypt');
class UserService {
    constructor() {
        this.userRepository = new UserRepository;
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("something went wrong in the service layer");
            throw error;
        }
    }

    async signIn(email, plainPassword) {
        try {
            const user = await this.userRepository.getByEmail(email);
            const passwordMatch = await this.checkPassword(plainPassword, user.password);
            if (!passwordMatch) {
                throw new Error('Wrong Password');
            } else {
                const newJWT = this.createToken({email: user.email, id: user.id});
                return newJWT;
            }
        } catch (error) {
            console.log("something went wrong in the sign in process");
            throw error;
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response) {
                throw {error:'Invalid Token'};
            }
            const user = this.userRepository.getById(response.id);
            if(!user) {
                throw { error: "No USer with the corresponding token exists"}
            }
            return user.id;
        } catch (error) {
            console.log("something went wrong in the sign in process");
            throw error;
        }
    }

    createToken(user) {
        try {
           const result = jwt.sign(user, JWT_KEY, {
                expiresIn: '365d'
            });  
            return result;
        } catch (error) {
            console.log("Something went wrong in the Token Creation");
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in the Token Creation");
            throw error;
        }
    }

    checkPassword(userInputPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in the Password Checking");
            throw error;
        }
    }
} 

module.exports = UserService;
