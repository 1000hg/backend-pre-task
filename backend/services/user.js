const { user: UserModel } = require('../models');



const addUser = async (data) => {
    try {
        const newUser = await UserModel.create(data);

        return newUser;

    } catch (error) {
        console.error('Error :', error);
    }
};

module.exports = {
    addUser
}