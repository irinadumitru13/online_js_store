class AuthenticatedUserDto {
    constructor (token, fullName, role, user_id) {
        this.token = token;
        this.fullName = fullName;
        this.role = role;
        this.user_id = user_id;
    }

    get Token() {
        return this.token;
    }

    get FullName() {
        return this.fullName;
    }

    get Role() {
        return this.role;
    }

    get UserId() {
        return this.user_id;
    }
}

module.exports = AuthenticatedUserDto;