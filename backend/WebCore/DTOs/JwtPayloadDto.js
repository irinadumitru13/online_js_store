class JwtPayloadDto {

    constructor(userId, userRole) {
        this.userId = userId;
        this.userRole = userRole;
    }

    get UserId () {
        return this.userId;
    }

    get UserRole () {
        return this.userRole;
    }
}

module.exports = JwtPayloadDto;