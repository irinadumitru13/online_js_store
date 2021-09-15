const UsersRepository = require('../../Infrastructure/PostgreSQL/Repository/UsersRepository.js');
const AuthenticatedUserDto = require('../DTOs/AuthenticatedUserDto.js');
const JwtPayloadDto = require('../DTOs/JwtPayloadDto.js');
const ServerError = require("../../WebApp/Models/ServerError");

const { hashPassword, comparePlainTextToHashedPassword } = require('../Security/Password')
const { generateTokenAsync } = require('../Security/Jwt');
const nodemailer = require('../Config/nodemailer.config');

const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const authenticateAsync = async (email, plainTextPassword) => {

    console.info(`Authenticates user with email ${email}`);

    let user = await UsersRepository.getByEmailWithRoleAsync(email);

    if (!user) {
        throw new ServerError(`User with email ${email} doesn't exist!`, 404);
    }

    /**
     *
     * pas 1: verifica daca parola este buna (hint: functia compare)
     * pas 1.1.: compare returneaza true sau false. Daca parola nu e buna, arunca eroare
     * pas 2: genereaza token cu payload-ul JwtPayload
     * pas 3: returneaza AuthenticatedUserDto
     */

    if (!user.is_verified) {
        throw new ServerError('Account not verified!', 401);
    }

    if (! await comparePlainTextToHashedPassword(plainTextPassword, user.password)) {
        throw new ServerError("Incorrect password!", 403);
    }

    const token = await generateTokenAsync(new JwtPayloadDto(user.user_id, user.role));

    return new AuthenticatedUserDto(token, user.fullname, user.role, user.user_id);
};

const registerAsync = async (role_id, email, firstName, lastName, phoneNumber, plainTextPassword) => {
    /**
     *
     * pas 1: cripteaza parola
     * pas 2: adauga (username, parola criptata) in baza de date folosind UsersRepository.addAsync
     * pas 3: returneaza RegisteredUserDto
     *
     */

    const encryptedPass = await hashPassword(plainTextPassword);

    let token = '';
    for (let i = 0; i < 25; i++) {
        token += characters[Math.floor(Math.random() * characters.length )];
    }

    const result = await UsersRepository.addAsync(role_id, email, firstName, lastName, phoneNumber, encryptedPass, token);

    if (result.insertuser === 0) {
        throw new ServerError(`Couldn't add user ${email} in database.`, 500);
    }

    nodemailer.sendConfirmationEmail(firstName, email, token);

    return result;
};

module.exports = {
    authenticateAsync,
    registerAsync
}