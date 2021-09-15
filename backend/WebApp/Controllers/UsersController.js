const express = require('express');

const UsersManager = require('../../WebCore/Managers/UsersManager.js');
const UsersRepository = require('../../Infrastructure/PostgreSQL/Repository/UsersRepository.js');

const {
    UserRegisterBody,
    UserLoginBody,
    UserRegisterResponse,
    UserLoginResponse,
    UserUpdateResponse
} = require ('../Models/Users.js');

const ResponseFilter = require('../Filters/ResponseFilter.js');
const AuthorizationFilter = require('../Filters/AuthorizationFilter.js');
const {authorizeAndExtractTokenAsync} = require("../Filters/JWTFilter");
const RoleConstants = require('../Constants/Roles.js');
const ServerError = require("../Models/ServerError");

const Router = express.Router();

Router.post('/register', async (req, res) => {

    const userBody = new UserRegisterBody(req.body);

    try {
        await UsersManager.registerAsync(3, userBody.Email, userBody.FirstName, userBody.LastName,
            userBody.PhoneNumber, userBody.Password);
    } catch (ServerError) {
        ResponseFilter.setResponseDetails(res, 500, 'Email already registered.');
    }

    ResponseFilter.setResponseDetails(res, 201, 'User created.');
});


Router.get('/verify/:email/:verificationCode', async (req, res) => {
    let {
        email,
        verificationCode
    } = req.params;

    const result = await UsersRepository.verifyToken(email, verificationCode);

    if (!result.hasOwnProperty('verifytoken')) {
        throw new ServerError('Error in DB.', 500);
    }

    if (result.verifytoken !== 'User verified.') {
        ResponseFilter.setResponseDetails(res, 404, 'Registration code expired. Please register again.');
    }

    ResponseFilter.setResponseDetails(res, 200, result.verifytoken);
});

Router.post('/login', async (req, res) => {

    const userBody = new UserLoginBody(req.body);
    const userDto = await UsersManager.authenticateAsync(userBody.Email, userBody.Password);
    const user = new UserLoginResponse(userDto.UserId, userDto.Token, userDto.FullName, userDto.Role);

    ResponseFilter.setResponseDetails(res, 200, user);
});

Router.get('/', authorizeAndExtractTokenAsync, AuthorizationFilter.authorizeRoles(RoleConstants.ADMIN),
    async (req, res) => {

        const users = await UsersRepository.getAllAsync();

        ResponseFilter.setResponseDetails(res, 200, users.map(user => new UserRegisterResponse(user)));
    });

Router.put('/:userId/role/:roleId', authorizeAndExtractTokenAsync, AuthorizationFilter.authorizeRoles(RoleConstants.ADMIN),
    async (req, res) => {

        let {
            userId,
            roleId
        } = req.params;

        userId = parseInt(userId);
        if (!userId || userId < 1) {
            throw new ServerError('User ID must be a positive integer.', 400);
        }

        roleId = parseInt(roleId);
        if (!roleId || roleId < 1) {
            throw new ServerError('Role ID must be a positive integer.', 400);
        }

        const updatedUser = await UsersRepository.updateUserRoleAsync(userId, roleId);
        if (!updatedUser) {
            throw new ServerError('User not found', 404);
        }
        ResponseFilter.setResponseDetails(res, 200, new UserUpdateResponse(updatedUser));
    });

module.exports = Router;