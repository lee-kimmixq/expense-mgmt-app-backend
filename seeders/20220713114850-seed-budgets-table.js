"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("budgets", [
      {
        user_id: 1,
        category_id: 1,
        amount: 500,
        show_in_dashboard: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        category_id: 4,
        amount: 750,
        show_in_dashboard: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        category_id: 2,
        amount: 300,
        show_in_dashboard: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("budgets", null);
  },
};
