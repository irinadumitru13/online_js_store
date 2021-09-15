const express = require('express');

const CartRepository = require('../../Infrastructure/PostgreSQL/Repository/CartRepository.js');

const {
    CartProductResponse,
    AddToCartBody,
    DeleteFromCartResponse,
    PlaceOrderBody
} = require ('../Models/Cart.js');

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

    let products = await CartRepository.getAllByUserIdAsync(id);

    let subtotal = products.reduce((acc, product) => acc + (product.price * product.pieces), 0);

    let result = {};
    result['products'] = products.map(product => new CartProductResponse(product));
    result['subtotal'] = subtotal;
    result['total'] = Math.round(subtotal * 109) / 100;

    ResponseFilter.setResponseDetails(res, 200, result);
});

Router.post('/', AuthorizationFilter.authorizeRoles(RoleConstants.USER), async (req, res) => {
    const cartBody = new AddToCartBody(req.body);

    try {
        await CartRepository.addAsync(cartBody.UserId, cartBody.ProductId, cartBody.Size, cartBody.Pieces);
    } catch (Error) {
        throw new ServerError('Violation of foreign key constraint.', 500);
    }

    ResponseFilter.setResponseDetails(res, 200, 'Added to cart.');
});

Router.delete('/:id', AuthorizationFilter.authorizeRoles(RoleConstants.USER), async (req, res) => {
    let {
        id
    } = req.params;

    id = parseInt(id);

    if (!id || id < 1) {
        throw new ServerError('Id must be a positive integer.', 400);
    }

    const result = await CartRepository.deleteAsync(id);

    if (!result) {
        throw new ServerError(`No item with cart_id ${id} found.`, 404);
    }

    ResponseFilter.setResponseDetails(res, 200, new DeleteFromCartResponse(result));
});

Router.post('/order', AuthorizationFilter.authorizeRoles(RoleConstants.USER), async (req, res) => {
    const orderBody = new PlaceOrderBody(req.body);

    await CartRepository.placeOrderAsync(orderBody.UserId, orderBody.Total);

    ResponseFilter.setResponseDetails(res, 200, 'Order placed.');
});

module.exports = Router;