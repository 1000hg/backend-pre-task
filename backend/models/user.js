module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define("user", {
        idx: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: "인덱스"
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
            comment: "이름"
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: true,
            unique: true,
            comment: "닉네임"
        },
        phone_number: {
            type: DataTypes.STRING(20),
            allowNull: true,
            unique: true,
            comment: "휴대폰번호"
        },
        email: {
            type: DataTypes.STRING(20),
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true,
                
            },
            comment: "이메일"
        },
        birth: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            comment: "생일"
        },
        address: {
            type: DataTypes.STRING(60),
            allowNull: true,
            comment: "주소"
        },
        gender: {
            type: DataTypes.ENUM('남자', '여자', '기타'),
            allowNull: true,
            comment: "성별"
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'created_at',
            comment: "생성일"
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'updated_at',
            comment: "수정일"
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'deleted_at',
            comment: "삭제일"
        },
      },{
        tableName: "user",
        paranoid: true,
        timestamps: true
      });
    
      model.associate = (models) => {
        
      };
    
      return model;
};
  