const ServerError = require('../Models/ServerError.js');

const {
    verifyAndDecodeDataAsync
} = require('../../WebCore/Security/Jwt');

const authorizeAndExtractTokenAsync = async (req, res, next) => {
    if (!req.headers.authorization) {
        throw new ServerError('Lipseste headerul de autorizare!', 401);
    }
    const token = req.headers.authorization.split(" ")[1];

    req.user = await verifyAndDecodeDataAsync(token);
    next();
};

module.exports = {
    authorizeAndExtractTokenAsync
}