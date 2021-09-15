const ServerError = require("../Models/ServerError");

class ProductWish {
    constructor(product) {
        if (!product.hasOwnProperty('wish_id')) {
            throw new ServerError('wish_id is missing.', 500);
        }

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

        if (!product.hasOwnProperty('size')) {
            throw new ServerError('size is missing.', 500);
        }

        if (!product.hasOwnProperty('stock')) {
            throw new ServerError('stock is missing.', 500);
        }

        this.wish_id = product.wish_id;
        this.product_id = product.product_id;
        this.name = product.name;
        this.brand = product.brand;
        this.image = product.image;
        this.price = product.price;
        this.size = product.size;
        this.stock = product.stock;
    }
}

class WishPostBody {
    constructor(body) {
        if (!body.hasOwnProperty('user_id')) {
            throw new ServerError('User ID is missing.', 400);
        }

        if (!body.hasOwnProperty('product_id')) {
            throw new ServerError('Product ID is missing.', 400);
        }

        if (!body.hasOwnProperty('size')) {
            throw new ServerError('Size is missing.', 400);
        }

        this.user_id = body.user_id;
        this.product_id = body.product_id;
        this.size = body.size;
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
}

class DeleteWishResponse {
    constructor(product) {
        if (!product.hasOwnProperty('wish_id')) {
            throw new ServerError('wish_id is missing.', 500);
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

        this.wish_id = product.wish_id;
        this.user_id = product.user_id;
        this.product_id = product.product_id;
        this.size = product.size;
    }
}

module.exports = {
    ProductWish,
    WishPostBody,
    DeleteWishResponse
}