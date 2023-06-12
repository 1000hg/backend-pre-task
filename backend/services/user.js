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


const userList = async (res) => {
    try {
        const list = await UserModel.findAll();

        console.log(list[0])
        res.json({ list });
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
    userList,
    addUser
}