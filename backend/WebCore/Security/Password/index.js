const bcryptjs = require('bcryptjs');

const hashPassword = async (plainTextPassword) => {

    console.info('Hashing password');

    const salt = await bcryptjs.genSalt();
    return await bcryptjs.hash(plainTextPassword, salt);
};

const comparePlainTextToHashedPassword = async (plainTextPassword, hashedPassword) => {

    console.info('Comparing plaintext to hashed password');
    return await bcryptjs.compare(plainTextPassword, hashedPassword);
};

module.exports = {
    hashPassword,
    comparePlainTextToHashedPassword
}