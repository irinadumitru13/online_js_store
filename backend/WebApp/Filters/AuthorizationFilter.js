const ServerError = require('../Models/ServerError.js');

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        console.log(req.user);
        for (let i = 0; i < roles.length; i++) {
            // verificati daca req.user contine role sau userRole

            if (req.user.userRole === roles[i]) { // observati cum in req exista obiectul user trimis la middlewareul anterior, de autorizare token
                return next();
            }
        }
        throw new ServerError('Nu sunteti autorizat sa accesati resursa!', 403);
    }
};

module.exports = {
    authorizeRoles
}