const { profile_card: ProfileModel } = require('../models');

const profileInfo = async (user_idx) => {
    try {
        const value = await ProfileModel.findAll({
            where: {
                user_idx: user_idx,
            }, raw:true
        });

        const tableInfo = await ProfileModel.describe();
        const includedColumns = ['idx', 'user_idx', 'company_name', 'job_title', 'hire_date', 'quit_date'];

        const listStructure =  []

        Object.entries(tableInfo).map(([columnName, columnInfo]) => {
            const { comment, type, parentDataKey } = columnInfo;
            const dataKey = columnName;
          
            if (includedColumns.includes(columnName)) {
                listStructure.push ({
                    label: comment,
                    dataKey,
                    type,
                    parentDataKey,
                });
            }

            return;
        });

        const valueList = [];
        const valueStructures = [];

        if (value.length === 0) {
            valueStructures.push({
                label: '경력사항',
                dataKey: 'data0',
                childrenStructures: listStructure
            })
        }

        value.forEach((item, index) => {
            valueList.push({ [`data${index}`]: [item] })
            
            valueStructures.push({
                label: '경력사항',
                dataKey: "data" + index,
                childrenStructures: listStructure
            })
        })


        return {valueList, valueStructures};
    } catch (error) {
        console.error('Error :', error);
    }
}

const deleteProfile = async (idx) => {
    try {
        const result = await ProfileModel.destroy({ where: { user_idx: idx } });
    
        if (result >= 0) {
            return 1
        } else {
            return 0;
        }
    } catch (error) {
      console.error('사용자 업데이트 오류:', error);
    }
};

module.exports = {
    profileInfo,
    deleteProfile
}