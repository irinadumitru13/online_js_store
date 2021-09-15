const ServerError = require('./ServerError.js');

class CategoryResponse {
    constructor(category) {
        if (!category.hasOwnProperty('category_id')) {
            throw new ServerError('category_id is missing.', 500);
        }

        if (!category.hasOwnProperty('name_ro')) {
            throw new ServerError('name_ro is missing.', 500);
        }

        if (!category.hasOwnProperty('name_en')) {
            throw new ServerError('name_en is missing.', 500);
        }

        this.category_id = category.category_id;
        this.ro = category.name_ro;
        this.en = category.name_en;
    }
}

class ProductCategoryResponse {
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

        if (!product.hasOwnProperty('stock')) {
            throw new ServerError('stock is missing.', 500);
        }

        this.product_id = product.product_id;
        this.name = product.name;
        this.brand = product.brand;
        this.image = product.image;
        this.price = product.price;
        this.stock = product.stock;
    }
}

module.exports = {
    CategoryResponse,
    ProductCategoryResponse
};