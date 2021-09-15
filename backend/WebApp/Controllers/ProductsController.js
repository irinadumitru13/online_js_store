const express = require('express');

const ProductsRepository = require('../../Infrastructure/PostgreSQL/Repository/ProductsRepository.js');

const {
    ProductResponse,
    PriceUpdateBody,
    PriceUpdateResponse,
    StockUpdateBody,
    StockUpdateResponse
} = require ('../Models/Products.js');

const ResponseFilter = require('../Filters/ResponseFilter.js');
const AuthorizationFilter = require('../Filters/AuthorizationFilter.js');
const RoleConstants = require('../Constants/Roles.js');
const ServerError = require("../Models/ServerError");

const Router = express.Router();

Router.get('/:id', AuthorizationFilter.authorizeRoles(RoleConstants.USER, RoleConstants.SUPPORT), async (req, res) => {
    let {
        id
    } = req.params;

    id = parseInt(id);

    if (!id || id < 1) {
        throw new ServerError('Id must be a positive integer.', 400);
    }

    const product = await ProductsRepository.getByProductIdAsync(id);

    if (!product) {
        throw new ServerError(`Product with id ${id} not found.`, 404);
    }

    ResponseFilter.setResponseDetails(res, 200, new ProductResponse(product));
});

Router.put('/:id', AuthorizationFilter.authorizeRoles(RoleConstants.SUPPORT), async (req, res) => {
    let {
        id
    } = req.params;

    id = parseInt(id);

    if (!id || id < 1) {
        throw new ServerError('Id must be a positive integer.', 400);
    }

    const priceBody = new PriceUpdateBody(req.body);

    const product = await ProductsRepository.updateProductPriceAsync(id, priceBody.Price);

    if (!product) {
        throw new ServerError(`Product with ${id} doesn't exist.`, 404);
    }

    ResponseFilter.setResponseDetails(res, 200, new PriceUpdateResponse(product));
});

Router.put('/:id/stock', AuthorizationFilter.authorizeRoles(RoleConstants.SUPPORT), async (req, res) => {
    let {
        id
    } = req.params;

    id = parseInt(id);

    if (!id || id < 1) {
        throw new ServerError('Id must be a positive integer.', 400);
    }

    const stockBody = new StockUpdateBody(req.body);

    const stock = await ProductsRepository.updateStockAsync(id, stockBody.XS, stockBody.S, stockBody.M, stockBody.L, stockBody.XL);

    if (!stock) {
        throw new ServerError(`Product with ${id} doesn't exist.`, 404);
    }

    ResponseFilter.setResponseDetails(res, 200, new StockUpdateResponse(stock));
});

module.exports = Router;