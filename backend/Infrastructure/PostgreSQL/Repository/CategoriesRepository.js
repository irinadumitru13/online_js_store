const {
    queryAsync
} = require('..');

const getAllAsync = async () => {
    console.info('Getting all product categories from database...');

    return await queryAsync('SELECT * FROM CATEGORIES');
};

const getProductsByCategoryId = async (category_id) => {
    console.info(`Getting all products for category ${category_id} from database...`);

    return await queryAsync(
        'SELECT p.product_id, p.name, p.brand, p.image, p.price,' +
                ' s.XS + s.S + s.M + s.L + s.XL AS stock' +
             ' FROM PRODUCTS p NATURAL JOIN STOCK s' +
             ' WHERE p.category_id = CAST($1 AS smallint)', [category_id]);
};

module.exports = {
    getAllAsync,
    getProductsByCategoryId
};