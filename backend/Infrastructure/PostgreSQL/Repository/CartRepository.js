const {
    queryAsync
} = require('..');

const getAllByUserIdAsync = async (user_id) => {
    console.info(`Getting all products in cart for user ${user_id}...`);

    return await queryAsync(
        'SELECT p.product_id, p.name, p.brand, p.image, p.price, c.cart_id, c.size, c.pieces' +
             ' FROM CART c NATURAL JOIN PRODUCTS p' +
             ' WHERE c.user_id = $1 AND order_id IS NULL', [user_id]);
};

const addAsync = async (user_id, product_id, size, pieces) => {
    console.info(`Adding ${pieces} pieces, size ${size} of item with id ${product_id} in cart for user ${user_id}...`);

    const result = await queryAsync('SELECT addToCart($1, $2, $3, $4)', [user_id, product_id, size, pieces]);

    return result[0];
};

const deleteAsync = async (cart_id) => {
    console.info(`Deleting item with id ${cart_id} from cart...`);

    const result =  await queryAsync('DELETE FROM CART WHERE cart_id = $1 RETURNING cart_id, user_id, product_id, size, pieces', [cart_id]);

    return result[0];
};

const placeOrderAsync = async (user_id, total) => {
    console.info(`Placing order for user ${user_id} with total ${total}...`);

    return await queryAsync('SELECT placeOrder($1, $2)', [user_id, total]);
};

module.exports = {
    getAllByUserIdAsync,
    addAsync,
    deleteAsync,
    placeOrderAsync
};

