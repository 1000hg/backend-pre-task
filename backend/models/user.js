module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define("user", {
        idx: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: true,
            unique: true,
        },
        phone_number: {
            type: DataTypes.STRING(20),
            allowNull: true,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(20),
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        birth: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING(60),
            allowNull: true,
        },
        gender: {
            type: DataTypes.ENUM('남자', '여자', '기타'),
            allowNull: true,
        },
      },{
        tableName: "user",
        paranoid: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        timestamps: true
      });
    
      model.associate = (models) => {
        
      };
    
      return model;
};
  