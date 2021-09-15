const {
    queryAsync
} = require('..');

const getAllAsync = async () => {
    console.info('Getting all products from the database...');

    return await queryAsync(
        'SELECT p.product_id, p.name, p.category_id, p.brand, p.description, p.image, p.price, s.XS, s.S, s.M, s.L, s.XL' +
             ' FROM PRODUCTS p NATURAL JOIN STOCK s');
};

const getByProductIdAsync = async (product_id) => {
    console.info(`Getting product with id ${product_id} from database...`);

    const product =  await queryAsync(
        'SELECT p.product_id, p.name, p.brand, p.description, p.image, p.price, s.XS, s.S, s.M, s.L, s.XL' +
             ' FROM PRODUCTS p NATURAL JOIN STOCK s\n' +
             ' WHERE p.product_id = CAST($1 AS smallint)', [product_id]);

    return product[0];
};

const updateProductPriceAsync = async (product_id, price) => {
    console.info(`Updating the price of product with id ${product_id}...`);

    const product =  await queryAsync('UPDATE PRODUCTS SET price=$2 WHERE product_id=$1 RETURNING product_id, price',
        [product_id, price]);

    return product[0];
};

const updateStockAsync = async (product_id, xs, s, m, l, xl) => {
    console.info(`Updating the stock of product with id ${product_id}...`);

    const stock = await queryAsync('UPDATE STOCK SET XS=$2, S=$3, M=$4, L=$5, XL=$6 WHERE product_id=$1 RETURNING *',
        [product_id, xs, s, m, l, xl]);

    return stock[0];
};

module.exports = {
    getAllAsync,
    getByProductIdAsync,
    updateProductPriceAsync,
    updateStockAsync
};