const Router = require('express')();


/**
 * import controllers
 */
const CartController = require('./CartController.js');
const CategoriesController = require('./CategoriesController.js');
const ProductsController = require('./ProductsController.js');
const UsersController = require('./UsersController.js');
const WishController = require('./WishController.js');
const {authorizeAndExtractTokenAsync} = require("../Filters/JWTFilter");

/**
 * add controllers to main router
 */
Router.use('/cart', authorizeAndExtractTokenAsync, CartController);
Router.use('/category', authorizeAndExtractTokenAsync, CategoriesController);
Router.use('/products', authorizeAndExtractTokenAsync, ProductsController);
Router.use('/users', UsersController);
Router.use('/wish', authorizeAndExtractTokenAsync, WishController);

module.exports = Router