const { response } = require('express');
const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            success: true,
            messsage: 'Successfully created a New user',
            data: response,
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            messsage: 'Something went wrong',
            data: {},
            success: false,
            err: error
        })
    }
}

module.exports = {
    create
}