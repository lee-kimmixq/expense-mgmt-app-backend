const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface) {
    const transactionsArray = [];
    const transactionCategoriesArray = [];

    for (let i = 31; i <= 55; i += 1) {
      // shopping
      if (i <= 40) {
        transactionsArray.push({
          user_id: 1,
          title: faker.commerce.productName(),
          amount: faker.finance.amount(1, 100),
          txn_date: faker.date.between(
            "2022-07-01T00:00:00.000Z",
            "2022-07-06T00:00:00.000Z"
          ),
          created_at: new Date(),
          updated_at: new Date(),
        });

        transactionCategoriesArray.push({
          category_id: 4,
          transaction_id: i,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }

      // taxi
      else if (i <= 50) {
        transactionsArray.push({
          user_id: 1,
          title: `${faker.address.buildingNumber()} ${faker.address.street()}`,
          amount: faker.finance.amount(1, 100),
          txn_date: faker.date.between(
            "2022-07-01T00:00:00.000Z",
            "2022-07-06T00:00:00.000Z"
          ),
          created_at: new Date(),
          updated_at: new Date(),
        });

        transactionCategoriesArray.push({
          category_id: 2,
          transaction_id: i,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }

      // income
      else if (i <= 51) {
        transactionsArray.push({
          user_id: 1,
          title: "Salary",
          amount: 2500,
          txn_date: faker.date.between(
            "2022-07-01T00:00:00.000Z",
            "2022-07-06T00:00:00.000Z"
          ),
          created_at: new Date(),
          updated_at: new Date(),
        });

        transactionCategoriesArray.push({
          category_id: 32,
          transaction_id: i,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }

      // investments
      else {
        transactionsArray.push({
          user_id: 1,
          title: "Stock Returns",
          amount: faker.finance.amount(50, 200),
          txn_date: faker.date.between(
            "2022-07-01T00:00:00.000Z",
            "2022-07-06T00:00:00.000Z"
          ),
          created_at: new Date(),
          updated_at: new Date(),
        });

        transactionCategoriesArray.push({
          category_id: 30,
          transaction_id: i,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert("transactions", transactionsArray);

    await queryInterface.bulkInsert(
      "transaction_categories",
      transactionCategoriesArray
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("transaction_categories", null);
    await queryInterface.bulkDelete("transactions", null);
  },
};
