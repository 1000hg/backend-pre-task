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
        const tableInfo = await UserModel.describe();
      
        const columns = Object.entries(tableInfo).map(([columnName, columnInfo]) => {
            const { comment, type, parentDataKey } = columnInfo;
            const dataKey = columnName;
          
            return {
              label: comment,
              dataKey,
              type,
              parentDataKey,
            };
        });

        return columns;
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


const userInfo = async (user_idx) => {
    try {
        const value = await UserModel.findOne({
            where: {
              idx: user_idx,
            },
        });

        const tableInfo = await UserModel.describe();

        const valueStructures = Object.entries(tableInfo).map(([columnName, columnInfo]) => {
            const { comment, type, parentDataKey } = columnInfo;
            const dataKey = columnName;
          
            return {
              label: comment,
              dataKey,
              type,
              parentDataKey,
            };
        });

        return {value, valueStructures};
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
    userInfo,
    addUser
}