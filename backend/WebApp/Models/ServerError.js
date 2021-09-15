class ServerError extends Error {
    constructor(message, httpStatus) {
        super(message);
        this.Name = this.constructor.name;
        this.statusCode = httpStatus;
        Error.captureStackTrace(this, this.constructor);
    }

    get Message() {
        return this.message;
    }

    get StatusCode() {
        return this.statusCode;
    }
}

module.exports = ServerError;
