const express = require('express');

const WishRepository = require('../../Infrastructure/PostgreSQL/Repository/WishRepository.js');

const {
    ProductWish,
    WishPostBody,
    DeleteWishResponse
} = require ('../Models/Wish.js');

const ResponseFilter = require('../Filters/ResponseFilter.js');
const AuthorizationFilter = require('../Filters/AuthorizationFilter.js');
const RoleConstants = require('../Constants/Roles.js');
const ServerError = require("../Models/ServerError");

const Router = express.Router();

Router.get('/:id', AuthorizationFilter.authorizeRoles(RoleConstants.USER), async (req, res) => {
    let {
        id
    } = req.params;

    id = parseInt(id);

    if (!id || id < 1) {
        throw new ServerError('Id must be a positive integer.', 400);
    }

    const products = await WishRepository.getAllAsync(id);

    ResponseFilter.setResponseDetails(res, 200, products.map(product => new ProductWish(product)));
});

Router.post('/', AuthorizationFilter.authorizeRoles(RoleConstants.USER), async (req, res) => {
    const wishBody = new WishPostBody(req.body);

    await WishRepository.addAsync(wishBody.UserId, wishBody.ProductId, wishBody.Size);

    ResponseFilter.setResponseDetails(res, 200, 'Added to wishlist.');
});

Router.delete('/:id', AuthorizationFilter.authorizeRoles(RoleConstants.USER), async (req, res) => {
    let {
        id
    } = req.params;

    id = parseInt(id);

    if (!id || id < 1) {
        throw new ServerError('Id must be a positive integer.', 400);
    }

    const result = await WishRepository.deleteAsync(id);

    if (!result) {
        throw new ServerError('No wish entry with id ${id} found.', 404);
    }

    ResponseFilter.setResponseDetails(res, 200, new DeleteWishResponse(result));
});

module.exports = Router;