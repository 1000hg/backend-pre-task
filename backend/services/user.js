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



const userColumnList = async (res) => {
    try {
        const columns = Object.keys(UserModel.rawAttributes).map(attribute => ({
            label: attribute,
            dataKey: attribute,
            parentDataKey: null,
        }));
      
          res.json({ columns });
    } catch (error) {
        console.error('Error:', error);
    }
};

const userList = async (res) => {
    try {
        const list = await UserModel.findAll();

        res.json({ list, total:list.length });
    } catch (error) {
        console.error('Error :', error);
    }
}

const addUser = async (res, data) => {
    try {
        const newUser = await UserModel.create(data);

        return newUser;
    } catch (error) {
        console.error('Error :', error);
    }
};

module.exports = {
    findUserByNickName,
    userColumnList,
    userList,
    addUser
}