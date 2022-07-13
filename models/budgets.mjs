export default function initBudgetModel(sequelize, DataTypes) {
  return sequelize.define(
    "budgets",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "categories",
          key: "id",
        },
      },
      amount: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
      },
      showInDashboard: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      underscored: true,
    }
  );
}
