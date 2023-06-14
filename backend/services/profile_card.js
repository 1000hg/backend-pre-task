const { profile_card: ProfileModel } = require('../models');

const profileInfo = async (user_idx) => {
    try {
        const value = await ProfileModel.findAll({
            where: {
                user_idx: user_idx,
            },
        });

        const tableInfo = await ProfileModel.describe();
        const includedColumns = ['idx', 'user_idx', 'company_name', 'job_title', 'hire_date', 'quit_date'];

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

module.exports = {
    profileInfo
}