const ServerError = require('./ServerError.js');

class ProductResponse {
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

        if (!product.hasOwnProperty('description')) {
            throw new ServerError('description is missing.', 500);
        }

        if (!product.hasOwnProperty('image')) {
            throw new ServerError('image is missing.', 500);
        }

        if (!product.hasOwnProperty('price')) {
            throw new ServerError('price is missing.', 500);
        }

        if (!product.hasOwnProperty('xs')) {
            throw new ServerError('XS stock is missing.', 500);
        }

        if (!product.hasOwnProperty('s')) {
            throw new ServerError('S stock is missing.', 500);
        }

        if (!product.hasOwnProperty('m')) {
            throw new ServerError('M stock is missing.', 500);
        }

        if (!product.hasOwnProperty('l')) {
            throw new ServerError('L stock is missing.', 500);
        }

        if (!product.hasOwnProperty('xs')) {
            throw new ServerError('XL stock is missing.', 500);
        }

        this.product_id = product.product_id;
        this.name = product.name;
        this.brand = product.brand;
        this.description = product.description;
        this.image = product.image;
        this.price = product.price;
        this.XS = product.xs;
        this.S = product.s;
        this.M = product.m;
        this.L = product.l;
        this.XL = product.xl;
    }
}

class PriceUpdateBody {
    constructor(body) {
        if (!body.hasOwnProperty('price')) {
            throw new ServerError('Price is missing.', 400);
        }

        this.price = body.price;
    }

    get Price() {
        return this.price;
    }
}

class PriceUpdateResponse {
    constructor(product) {
        if (!product.hasOwnProperty('product_id')) {
            throw new ServerError('product_id is missing.', 500);
        }

        if (!product.hasOwnProperty('price')) {
            throw new ServerError('Price is missing.', 500);
        }

        this.product_id = product.product_id;
        this.price = product.price;
    }
}

class StockUpdateBody {
    constructor(body) {
        if(!body.hasOwnProperty('XS')) {
            throw new ServerError('XS stock is missing.', 400);
        }

        if(!body.hasOwnProperty('S')) {
            throw new ServerError('S stock is missing.', 400);
        }

        if(!body.hasOwnProperty('M')) {
            throw new ServerError('M stock is missing.', 400);
        }

        if(!body.hasOwnProperty('L')) {
            throw new ServerError('L stock is missing.', 400);
        }

        if(!body.hasOwnProperty('XL')) {
            throw new ServerError('XL stock is missing.', 400);
        }

        this.xs = body.XS;
        this.s = body.S;
        this.m = body.M;
        this.l = body.L;
        this.xl = body.XL;
    }

    get XS() {
        return this.xs;
    }

    get S() {
        return this.s;
    }

    get M() {
        return this.m;
    }

    get L() {
        return this.l;
    }

    get XL() {
        return this.xl;
    }
}

class StockUpdateResponse {
    constructor(stock) {
        if (!stock.hasOwnProperty("product_id")) {
            throw new ServerError('product_id is missing.', 500);
        }

        if(!stock.hasOwnProperty('xs')) {
            throw new ServerError('XS stock is missing.', 500);
        }

        if(!stock.hasOwnProperty('s')) {
            throw new ServerError('S stock is missing.', 500);
        }

        if(!stock.hasOwnProperty('m')) {
            throw new ServerError('M stock is missing.', 500);
        }

        if(!stock.hasOwnProperty('l')) {
            throw new ServerError('L stock is missing.', 500);
        }

        if(!stock.hasOwnProperty('xl')) {
            throw new ServerError('XL stock is missing.', 500);
        }

        this.product_id = stock.product_id;
        this.XS = stock.xs;
        this.S = stock.s;
        this.M = stock.m;
        this.L = stock.l;
        this.XL = stock.xl;
    }
}

module.exports = {
    ProductResponse,
    PriceUpdateBody,
    PriceUpdateResponse,
    StockUpdateBody,
    StockUpdateResponse
};