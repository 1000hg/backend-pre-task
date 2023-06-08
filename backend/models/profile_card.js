module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define("profile_card", {
      idx: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      user_idx: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: "user",
              key: "idx"
          }
      },
      company_name: {
          type: DataTypes.STRING(30),
          allowNull: true
      },
      job_title: {
          type: DataTypes.STRING(30),
          allowNull: true,
      },
      hire_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      quit_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      }

  },{
      tableName: "profile_card",
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at"
  });

  model.associate = (models) => {
      model.belongsTo(models.user, { foreignKey: "user_idx" });
  };

  return model;
};

