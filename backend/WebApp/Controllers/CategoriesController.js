const express = require('express');

const CategoriesRepository = require('../../Infrastructure/PostgreSQL/Repository/CategoriesRepository.js');

const {
    CategoryResponse,
    ProductCategoryResponse
} = require ('../Models/Categories.js');

const ResponseFilter = require('../Filters/ResponseFilter.js');
const AuthorizationFilter = require('../Filters/AuthorizationFilter.js');
const RoleConstants = require('../Constants/Roles.js');
const ServerError = require("../Models/ServerError");

const Router = express.Router();

Router.get('/', AuthorizationFilter.authorizeRoles(RoleConstants.USER, RoleConstants.SUPPORT), async (req, res) => {
    const categories = await CategoriesRepository.getAllAsync();

    ResponseFilter.setResponseDetails(res, 200, categories.map(category => new CategoryResponse(category)));
});

Router.get('/:id', AuthorizationFilter.authorizeRoles(RoleConstants.USER, RoleConstants.SUPPORT), async (req, res) => {
    let {
        id
    } = req.params;

    id = parseInt(id);

    if (!id || id < 1) {
        throw new ServerError('Id must be a positive integer.', 400);
    }

    const products = await CategoriesRepository.getProductsByCategoryId(id);

    ResponseFilter.setResponseDetails(res, 200, products.map(product => new ProductCategoryResponse(product)));
});

module.exports = Router;