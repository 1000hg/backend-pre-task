const { user: UserModel } = require('../models');


const findUserByNickName = async (nickname) => {
    try {
        const user = await UserModel.findOne({
            where: { nickname: nickname },
        });
    
        if (user) {
            return user;
        } else {
            return "No-User";
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

const addUser = async (data) => {
    try {
        const newUser = await UserModel.create(data);

        return newUser;

    } catch (error) {
        console.error('Error :', error);
    }
};

module.exports = {
    findUserByNickName,
    addUser
}