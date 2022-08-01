const getHash = require("../utils/getHash.js");
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const txnArr = [];
    const txnCtyArr = [];

    // monthly salary for july
    txnArr.push({
      user_id: 3,
      title: "Salary",
      amount: 4500,
      txn_date: faker.date.between(
        `2022-07-25T00:00:00.000Z`,
        `2022-07-28T23:59:59.999Z`
      ),
      created_at: new Date(),
      updated_at: new Date(),
    });

    txnCtyArr.push({
      category_id: 32,
      transaction_id: 1337,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // investments
    for (let i = 1; i <= 3; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "Investment Returns",
        amount: faker.finance.amount(200, 500),
        txn_date: faker.date.between(
          `2022-07-23T00:00:00.000Z`,
          `2022-08-01T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 1338; i <= 1340; i += 1) {
      txnCtyArr.push({
        category_id: 30,
        transaction_id: i,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // other income
    txnArr.push({
      user_id: 3,
      title: "Strike 4D",
      amount: faker.finance.amount(60, 200),
      txn_date: faker.date.between(
        `2022-07-23T00:00:00.000Z`,
        `2022-08-01T23:59:59.999Z`
      ),
      created_at: new Date(),
      updated_at: new Date(),
    });

    txnCtyArr.push({
      category_id: 33,
      transaction_id: 1341,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // food 1
    for (let i = 0; i < 5; i += 1) {
      txnArr.push({
        user_id: 3,
        title: `Lunch with ${faker.name.firstName()}`,
        amount: faker.finance.amount(5, 99),
        txn_date: faker.date.between(
          `2022-07-23T00:00:00.000Z`,
          `2022-08-01T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 0; i < 5; i += 1) {
      txnArr.push({
        user_id: 3,
        title: `Dinner with ${faker.name.firstName()}`,
        amount: faker.finance.amount(5, 99),
        txn_date: faker.date.between(
          `2022-07-23T00:00:00.000Z`,
          `2022-08-01T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 1342; i <= 1351; i += 1) {
      txnCtyArr.push({
        category_id: 1,
        transaction_id: i,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // taxi 2

    for (let i = 0; i < 10; i += 1) {
      txnArr.push({
        user_id: 3,
        title: `Grab to ${faker.address.buildingNumber()} ${faker.address.street()}`,
        amount: faker.finance.amount(10, 30),
        txn_date: faker.date.between(
          `2022-07-23T00:00:00.000Z`,
          `2022-08-01T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 1352; i <= 1361; i += 1) {
      txnCtyArr.push({
        category_id: 2,
        transaction_id: i,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // public transport 3

    for (let i = 0; i < 10; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "MRT",
        amount: faker.finance.amount(1, 2),
        txn_date: faker.date.between(
          `2022-07-23T00:00:00.000Z`,
          `2022-08-01T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 0; i < 10; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "Bus",
        amount: faker.finance.amount(1, 2),
        txn_date: faker.date.between(
          `2022-07-23T00:00:00.000Z`,
          `2022-08-01T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 1362; i <= 1381; i += 1) {
      txnCtyArr.push({
        category_id: 3,
        transaction_id: i,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // shopping 4

    for (let i = 0; i < 20; i += 1) {
      txnArr.push({
        user_id: 3,
        title: faker.commerce.product(),
        amount: faker.finance.amount(30, 75),
        txn_date: faker.date.between(
          `2022-07-23T00:00:00.000Z`,
          `2022-08-01T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 1382; i <= 1401; i += 1) {
      txnCtyArr.push({
        category_id: 4,
        transaction_id: i,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // groceries 5

    for (let i = 0; i < 3; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "NTUC",
        amount: faker.finance.amount(15, 75),
        txn_date: faker.date.between(
          `2022-07-23T00:00:00.000Z`,
          `2022-08-01T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 0; i < 3; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "Giant",
        amount: faker.finance.amount(15, 75),
        txn_date: faker.date.between(
          `2022-07-23T00:00:00.000Z`,
          `2022-08-01T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 0; i < 3; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "Cold Storage",
        amount: faker.finance.amount(15, 75),
        txn_date: faker.date.between(
          `2022-07-23T00:00:00.000Z`,
          `2022-08-01T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 1402; i <= 1410; i += 1) {
      txnCtyArr.push({
        category_id: 5,
        transaction_id: i,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // entertainment 7

    for (let i = 0; i < 5; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "Movie",
        amount: faker.finance.amount(10, 15),
        txn_date: faker.date.between(
          `2021-06-01T00:00:00.000Z`,
          `2022-07-23T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 1411; i <= 1415; i += 1) {
      txnCtyArr.push({
        category_id: 7,
        transaction_id: i,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // family 14

    txnArr.push({
      user_id: 3,
      title: "Household Contribution",
      amount: 300,
      txn_date: faker.date.between(
        `2022-08-01T00:00:00.000Z`,
        `2022-08-01T23:59:59.999Z`
      ),
      created_at: new Date(),
      updated_at: new Date(),
    });

    txnCtyArr.push({
      category_id: 14,
      transaction_id: 1416,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // investments 16

    txnArr.push({
      user_id: 3,
      title: "Syfe",
      amount: 250,
      txn_date: faker.date.between(
        `2022-07-20T00:00:00.000Z`,
        `2022-07-28T23:59:59.999Z`
      ),
      created_at: new Date(),
      updated_at: new Date(),
    });

    txnCtyArr.push({
      category_id: 16,
      transaction_id: 1417,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // insurance 19

    txnArr.push({
      user_id: 3,
      title: "GE Insurance",
      amount: 450,
      txn_date: faker.date.between(
        `2022-07-20T00:00:00.000Z`,
        `2022-07-28T23:59:59.999Z`
      ),
      created_at: new Date(),
      updated_at: new Date(),
    });

    txnCtyArr.push({
      category_id: 19,
      transaction_id: 1418,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // subscriptions 25

    txnArr.push({
      user_id: 3,
      title: "Spotify Shared",
      amount: 2.83,
      txn_date: faker.date.between(
        `2022-07-05T00:00:00.000Z`,
        `2022-07-10T23:59:59.999Z`
      ),
      created_at: new Date(),
      updated_at: new Date(),
    });
    txnArr.push({
      user_id: 3,
      title: "iCloud 200GB",
      amount: 4.09,
      txn_date: faker.date.between(
        `2022-07-05T00:00:00.000Z`,
        `2022-07-10T23:59:59.999Z`
      ),
      created_at: new Date(),
      updated_at: new Date(),
    });
    txnArr.push({
      user_id: 3,
      title: "Netflix Shared",
      amount: 5.5,
      txn_date: faker.date.between(
        `2022-07-05T00:00:00.000Z`,
        `2022-07-10T23:59:59.999Z`
      ),
      created_at: new Date(),
      updated_at: new Date(),
    });

    for (let i = 1419; i <= 1421; i += 1) {
      txnCtyArr.push({
        category_id: 25,
        transaction_id: i,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("transactions", txnArr);

    await queryInterface.bulkInsert("transaction_categories", txnCtyArr);
  },

  async down(queryInterface, Sequelize) {},
};
