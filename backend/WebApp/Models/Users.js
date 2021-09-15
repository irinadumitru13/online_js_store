const ServerError = require('./ServerError.js');

class UserRegisterBody {
    constructor (body) {

        if (!body.email) {
            throw new ServerError("Email is missing", 400);
        }

        if (!body.password) {
            throw new ServerError("Password is missing", 400);
        }

        if (body.password.length < 4) {
            throw new ServerError("Password is too short!", 400);
        }

        if (!body.firstName) {
            throw new ServerError("First name is missing", 400);
        }

        if (!body.lastName) {
            throw new ServerError("Last name is missing", 400);
        }

        if (!body.phoneNumber) {
            throw new ServerError("Phone number is missing", 400);
        }

        this.email = body.email;
        this.password = body.password;
        this.firstName = body.firstName;
        this.lastName = body.lastName;
        this.phoneNumber = body.phoneNumber;
    }

    get Email () {
        return this.email;
    }

    get Password () {
        return this.password;
    }

    get FirstName () {
        return this.firstName;
    }

    get LastName () {
        return this.lastName;
    }

    get PhoneNumber () {
        return this.phoneNumber;
    }
}

class UserLoginBody {
    constructor (body) {
        if (!body.email) {
            throw new ServerError("Email is missing", 400);
        }

        if (!body.password) {
            throw new ServerError("Password is missing", 400);
        }

        this.email = body.email;
        this.password = body.password;
    }

    get Email () {
        return this.email;
    }

    get Password () {
        return this.password;
    }
}

class UserRegisterResponse {
    constructor(user) {
        if (!user.hasOwnProperty('user_id')) {
            throw new ServerError('user_id is missing.', 500);
        }

        if (!user.hasOwnProperty('email')) {
            throw new ServerError('email is missing.', 500);
        }

        if (!user.hasOwnProperty('role_id')) {
            throw new ServerError('role_id is missing.', 500);
        }

        if (!user.hasOwnProperty('role')) {
            throw new ServerError('role is missing.', 500);
        }

        this.user_id = user.user_id;
        this.email = user.email;
        this.role_id = user.role_id;
        this.role = user.role;
    }
}

class UserLoginResponse {
    constructor(user_id, token, fullName, role) {
        this.user_id = user_id;
        this.role = role;
        this.fullName = fullName;
        this.token = token;
    }
}

class UserUpdateResponse {
    constructor(user) {
        if (!user.hasOwnProperty('user_id')) {
            throw new ServerError('user_id is missing.', 500);
        }

        if (!user.hasOwnProperty('role_id')) {
            throw new ServerError('role_id is missing.', 500);
        }

        this.user_id = user.user_id;
        this.role_id = user.role_id;
    }
}
module.exports =  {
    UserRegisterBody,
    UserLoginBody,
    UserRegisterResponse,
    UserLoginResponse,
    UserUpdateResponse
}