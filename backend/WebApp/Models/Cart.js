const ServerError = require("../Models/ServerError");

class CartProductResponse {
    constructor(product) {
        if (!product.hasOwnProperty('product_id')) {
            throw new ServerError('product_id is missing.', 500);
        }

        if (!product.hasOwnProperty('name')) {
            throw new ServerError('name is missing.', 500);
        }

        if (!product.hasOwnProperty('brand')) {
            throw new ServerError('brand is missing.', 500);
        }

        if (!product.hasOwnProperty('image')) {
            throw new ServerError('image is missing.', 500);
        }

        if (!product.hasOwnProperty('price')) {
            throw new ServerError('price is missing.', 500);
        }

        if (!product.hasOwnProperty('cart_id')) {
            throw new ServerError('cart_id is missing.', 500);
        }

        if (!product.hasOwnProperty('size')) {
            throw new ServerError('size is missing.', 500);
        }

        if (!product.hasOwnProperty('pieces')) {
            throw new ServerError('pieces is missing.', 500);
        }

        this.product_id = product.product_id;
        this.name = product.name;
        this.brand = product.brand;
        this.image = product.image;
        this.price = product.price;
        this.cart_id = product.cart_id;
        this.size = product.size;
        this.pieces = product.pieces;
    }
}

class AddToCartBody {
    constructor(body) {
        if (!body.hasOwnProperty('user_id')) {
            throw new ServerError('user_id is missing.', 400);
        }

        if (!body.hasOwnProperty('product_id')) {
            throw new ServerError('Product ID is missing.', 400);
        }

        if (!body.hasOwnProperty('size')) {
            throw new ServerError('Size is missing.', 400);
        }

        if (!body.hasOwnProperty('pieces')) {
            throw new ServerError('Pieces is missing.', 400);
        }

        this.user_id = body.user_id;
        this.product_id = body.product_id;
        this.size = body.size;
        this.pieces = body.pieces;
    }

    get UserId() {
        return this.user_id;
    }

    get ProductId() {
        return this.product_id;
    }

    get Size() {
        return this.size;
    }

    get Pieces() {
        return this.pieces;
    }
}

class DeleteFromCartResponse {
    constructor(product) {
        if (!product.hasOwnProperty('cart_id')) {
            throw new ServerError('cart_id is missing.', 500);
        }

        if (!product.hasOwnProperty('user_id')) {
            throw new ServerError('user_id is missing.', 500);
        }

        if (!product.hasOwnProperty('product_id')) {
            throw new ServerError('product_id is missing.', 500);
        }

        if (!product.hasOwnProperty('size')) {
            throw new ServerError('size is missing.', 500);
        }

        if (!product.hasOwnProperty('pieces')) {
            throw new ServerError('pieces is missing.', 500);
        }

        this.cart_id = product.cart_id;
        this.user_id = product.user_id;
        this.product_id = product.product_id;
        this.size = product.size;
        this.pieces = product.pieces;
    }
}

class PlaceOrderBody {
    constructor(body) {
        if (!body.hasOwnProperty('user_id')) {
            throw new ServerError('User ID is missing.', 400);
        }

        if (!body.hasOwnProperty('total')) {
            throw new ServerError('Total is missing.', 400);
        }

        this.user_id = body.user_id;
        this.total = body.total;
    }

    get UserId() {
        return this.user_id;
    }

    get Total() {
        return this.total;
    }
}

module.exports = {
    CartProductResponse,
    AddToCartBody,
    DeleteFromCartResponse,
    PlaceOrderBody
}