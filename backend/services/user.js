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
        const excludedColumns = ['idx', 'created_at', 'deleted_at', 'updated_at'];

      
        let valueStructures = []
        Object.entries(tableInfo).map(([columnName, columnInfo]) => {
            const { comment, type, parentDataKey } = columnInfo;
            const dataKey = columnName;
          
            if (excludedColumns.includes(columnName)) {
                return;
            }


            valueStructures.push({
                label: comment,
                dataKey,
                type,
                parentDataKey,
            });
        });

        return valueStructures;
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
        const includedColumns = ['idx', 'nickname', 'phone_number', 'email', 'birth', 'gender'];

        const valueStructures = [];
        Object.entries(tableInfo).map(([columnName, columnInfo]) => {
            const { comment, type, parentDataKey } = columnInfo;
            const dataKey = columnName;
          
            if (includedColumns.includes(columnName)) {
                valueStructures.push ({
                    label: comment,
                    dataKey,
                    type,
                    parentDataKey,
                });
            }

            return;
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

const updateUser = async (data) => {
  try {
    const result = await UserModel.update(updatedUserInfo, {
        where: { idx: updatedUserInfo.idx },
    });
  
    if (result[0] === 1) {
      return 1;
    } else {
        return 0;
    }
  } catch (error) {
    console.error('사용자 업데이트 오류:', error);
  }
};

module.exports = {
    findUserByNickName,
    userColumnList,
    userList,
    userInfo,
    addUser,
    updateUser
}