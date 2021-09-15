const {
    queryAsync
} = require('..');

const getAllAsync = async () => {
    console.info('Getting all users from database...');

    return await queryAsync('SELECT u.user_id, u.email, u.role_id, r.role FROM USERS u NATURAL JOIN ROLES r');
};

const addAsync = async (roleId, email, firstName, lastName, phoneNumber, password, token) => {
    console.info(`Adding user ${email}...`);

    const result = await queryAsync('SELECT insertUser($1, $2, $3, $4, $5, $6, $7)',
        [roleId, email, firstName, lastName, phoneNumber, password, token]);

    return result[0];
};

const verifyToken = async (email, token) => {
    console.info(`Verifying account ${email}...`);

    const result = await queryAsync('SELECT verifyToken($1, $2)', [email, token]);

    return result[0];
};

const getByEmailWithRoleAsync = async (email) => {
    console.info(`Getting user with email ${email}...`);

    const users = await queryAsync(
        'SELECT u.user_id, r.role, u.firstName || \' \' || u.lastName as fullName, u.password, u.is_verified' +
             ' FROM USERS u JOIN ROLES r ON u.role_id = r.role_id' +
             ' WHERE u.email = $1', [email]);

    return users[0];
};

const updateUserRoleAsync = async (userId, roleId) => {
    console.info(`Modifying user's role with ID ${userId} into role with ID ${roleId}`);

    const users = await queryAsync('UPDATE USERS SET role_id = $2 WHERE user_id = $1 RETURNING user_id, role_id',
        [userId, roleId]);

    return users[0];
};

const deleteExpiredUsers = async () => {
    console.info('Deleting users whose registration token has expired...');

    return await queryAsync('DELETE FROM USERS WHERE is_verified = false AND EXTRACT(EPOCH FROM (NOW() - token_timestamp)) / 60 >= 15 RETURNING email');
}

module.exports = {
    getAllAsync,
    addAsync,
    verifyToken,
    getByEmailWithRoleAsync,
    updateUserRoleAsync,
    deleteExpiredUsers
}