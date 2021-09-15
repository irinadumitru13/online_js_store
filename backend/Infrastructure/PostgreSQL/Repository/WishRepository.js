const {
    queryAsync
} = require('..');

const getAllAsync = async (user_id) => {
    console.info(`Getting all items in user's ${user_id} wish list...`);

    return await queryAsync(
        'SELECT w.wish_id, w.product_id, p.name, p.brand, p.image, p.price, w.size, ' +
                    '(CASE w.size WHEN \'XS\' THEN s.XS WHEN \'S\' THEN s.S WHEN \'M\' THEN s.M WHEN \'L\' THEN s.L ELSE s.XL END) AS stock' +
             ' FROM WISH w NATURAL JOIN PRODUCTS p NATURAL JOIN STOCK s\n' +
             ' WHERE w.user_id = $1', [user_id]);
};

const addAsync = async (user_id, product_id, size) => {
    console.info(`Adding product ${product_id}, size ${size} in wish list of user ${user_id}...`);

    return await queryAsync('SELECT addToWish($1, $2, $3)', [user_id, product_id, size]);
};

const deleteAsync = async (wish_id) => {
    console.info(`Deleting the item with ${wish_id} from wish list...`);

    const result = await queryAsync('DELETE FROM WISH WHERE wish_id = $1 RETURNING *', [wish_id]);

    return result[0];
};

module.exports = {
    getAllAsync,
    addAsync,
    deleteAsync
}