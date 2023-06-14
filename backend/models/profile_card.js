module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define("profile_card", {
      idx: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
          comment: "인덱스"
      },
      user_idx: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: "user",
              key: "idx"
          },
          comment: "유저인덱스"
      },
      company_name: {
          type: DataTypes.STRING(30),
          allowNull: true,
          comment: "회사명"
      },
      job_title: {
          type: DataTypes.STRING(30),
          allowNull: true,
          comment: "직무"
      },
      hire_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        comment: "입사일"
      },
      quit_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        comment: "퇴사일"
      }

  },{
      tableName: "profile_card",
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      timestamps: true
  });

  model.associate = (models) => {
      model.belongsTo(models.user, { foreignKey: "user_idx" });
  };

  return model;
};

