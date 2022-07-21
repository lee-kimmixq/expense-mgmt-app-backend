const getHash = require("../utils/getHash.js");
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    // create user
    await queryInterface.bulkInsert("users", [
      {
        username: "Robert",
        email: "robert@makecents.com",
        contact: "12345678",
        password: getHash("robert"),
        status: "Active",
        confirmation_code: "sample",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    const txnArr = [];
    const txnCtyArr = [];

    // monthly salary
    for (let i = 1; i <= 12; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "Salary",
        amount: 4500,
        txn_date: faker.date.between(
          `2021-${i.toString().padStart(2, "0")}-25T00:00:00.000Z`,
          `2021-${i.toString().padStart(2, "0")}-28T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 1; i <= 6; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "Salary",
        amount: 4800,
        txn_date: faker.date.between(
          `2022-${i.toString().padStart(2, "0")}-25T00:00:00.000Z`,
          `2022-${i.toString().padStart(2, "0")}-28T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 56; i <= 73; i += 1) {
      txnCtyArr.push({
        category_id: 32,
        transaction_id: i,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // investments
    for (let i = 1; i <= 12; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "Investment Returns",
        amount: faker.finance.amount(200, 500),
        txn_date: faker.date.between(
          `2021-${i.toString().padStart(2, "0")}-01T00:00:00.000Z`,
          `2021-${i.toString().padStart(2, "0")}-28T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 1; i <= 6; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "Investment Returns",
        amount: faker.finance.amount(200, 500),
        txn_date: faker.date.between(
          `2022-${i.toString().padStart(2, "0")}-01T00:00:00.000Z`,
          `2022-${i.toString().padStart(2, "0")}-28T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 74; i <= 91; i += 1) {
      txnCtyArr.push({
        category_id: 30,
        transaction_id: i,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // other income
    for (let i = 0; i < 10; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "Strike 4D",
        amount: faker.finance.amount(60, 200),
        txn_date: faker.date.between(
          `2021-06-01T00:00:00.000Z`,
          `2022-07-23T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 92; i <= 101; i += 1) {
      txnCtyArr.push({
        category_id: 33,
        transaction_id: i,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 0; i < 5; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "GST Rebate",
        amount: 250,
        txn_date: faker.date.between(
          `2021-06-01T00:00:00.000Z`,
          `2022-07-23T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 102; i <= 106; i += 1) {
      txnCtyArr.push({
        category_id: 33,
        transaction_id: i,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // food 1
    for (let i = 0; i < 104; i += 1) {
      txnArr.push({
        user_id: 3,
        title: `Lunch with ${faker.name.firstName()}`,
        amount: faker.finance.amount(5, 99),
        txn_date: faker.date.between(
          `2021-06-01T00:00:00.000Z`,
          `2022-07-23T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 0; i < 100; i += 1) {
      txnArr.push({
        user_id: 3,
        title: `Dinner with ${faker.name.firstName()}`,
        amount: faker.finance.amount(5, 99),
        txn_date: faker.date.between(
          `2021-06-01T00:00:00.000Z`,
          `2022-07-23T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 107; i <= 310; i += 1) {
      txnCtyArr.push({
        category_id: 1,
        transaction_id: i,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // taxi 2

    for (let i = 0; i < 200; i += 1) {
      txnArr.push({
        user_id: 3,
        title: `Grab to ${faker.address.buildingNumber()} ${faker.address.street()}`,
        amount: faker.finance.amount(10, 30),
        txn_date: faker.date.between(
          `2021-06-01T00:00:00.000Z`,
          `2022-07-23T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 311; i <= 510; i += 1) {
      txnCtyArr.push({
        category_id: 2,
        transaction_id: i,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // public transport 3

    for (let i = 0; i < 100; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "MRT",
        amount: faker.finance.amount(1, 2),
        txn_date: faker.date.between(
          `2021-06-01T00:00:00.000Z`,
          `2022-07-23T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 0; i < 100; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "Bus",
        amount: faker.finance.amount(1, 2),
        txn_date: faker.date.between(
          `2021-06-01T00:00:00.000Z`,
          `2022-07-23T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 511; i <= 710; i += 1) {
      txnCtyArr.push({
        category_id: 3,
        transaction_id: i,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // shopping 4

    for (let i = 0; i < 200; i += 1) {
      txnArr.push({
        user_id: 3,
        title: faker.commerce.product(),
        amount: faker.finance.amount(30, 75),
        txn_date: faker.date.between(
          `2021-06-01T00:00:00.000Z`,
          `2022-07-23T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 711; i <= 910; i += 1) {
      txnCtyArr.push({
        category_id: 4,
        transaction_id: i,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // groceries 5

    for (let i = 0; i < 100; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "NTUC",
        amount: faker.finance.amount(15, 75),
        txn_date: faker.date.between(
          `2021-06-01T00:00:00.000Z`,
          `2022-07-23T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 0; i < 50; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "Giant",
        amount: faker.finance.amount(15, 75),
        txn_date: faker.date.between(
          `2021-06-01T00:00:00.000Z`,
          `2022-07-23T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 0; i < 50; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "Cold Storage",
        amount: faker.finance.amount(15, 75),
        txn_date: faker.date.between(
          `2021-06-01T00:00:00.000Z`,
          `2022-07-23T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 911; i <= 1110; i += 1) {
      txnCtyArr.push({
        category_id: 5,
        transaction_id: i,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // entertainment 7

    for (let i = 0; i < 100; i += 1) {
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

    for (let i = 1111; i <= 1210; i += 1) {
      txnCtyArr.push({
        category_id: 7,
        transaction_id: i,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // bills 10

    for (let i = 1; i <= 12; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "Phone Bill",
        amount: 20,
        txn_date: faker.date.between(
          `2021-${i.toString().padStart(2, "0")}-10T00:00:00.000Z`,
          `2021-${i.toString().padStart(2, "0")}-15T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 1; i <= 6; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "Phone Bill",
        amount: 20,
        txn_date: faker.date.between(
          `2022-${i.toString().padStart(2, "0")}-10T00:00:00.000Z`,
          `2022-${i.toString().padStart(2, "0")}-15T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 1211; i <= 1228; i += 1) {
      txnCtyArr.push({
        category_id: 10,
        transaction_id: i,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // family 14

    for (let i = 1; i <= 12; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "Household Contribution",
        amount: 300,
        txn_date: faker.date.between(
          `2021-${i.toString().padStart(2, "0")}-01T00:00:00.000Z`,
          `2021-${i.toString().padStart(2, "0")}-05T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 1; i <= 6; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "Household Contribution",
        amount: 300,
        txn_date: faker.date.between(
          `2022-${i.toString().padStart(2, "0")}-01T00:00:00.000Z`,
          `2022-${i.toString().padStart(2, "0")}-05T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 1229; i <= 1246; i += 1) {
      txnCtyArr.push({
        category_id: 14,
        transaction_id: i,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // investments 16

    for (let i = 1; i <= 12; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "Syfe",
        amount: 250,
        txn_date: faker.date.between(
          `2021-${i.toString().padStart(2, "0")}-20T00:00:00.000Z`,
          `2021-${i.toString().padStart(2, "0")}-28T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 1; i <= 6; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "Syfe",
        amount: 250,
        txn_date: faker.date.between(
          `2022-${i.toString().padStart(2, "0")}-20T00:00:00.000Z`,
          `2022-${i.toString().padStart(2, "0")}-28T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 1247; i <= 1264; i += 1) {
      txnCtyArr.push({
        category_id: 16,
        transaction_id: i,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // insurance 19

    for (let i = 1; i <= 12; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "GE Insurance",
        amount: 450,
        txn_date: faker.date.between(
          `2021-${i.toString().padStart(2, "0")}-20T00:00:00.000Z`,
          `2021-${i.toString().padStart(2, "0")}-28T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 1; i <= 6; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "GE Insurance",
        amount: 450,
        txn_date: faker.date.between(
          `2022-${i.toString().padStart(2, "0")}-20T00:00:00.000Z`,
          `2022-${i.toString().padStart(2, "0")}-28T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 1265; i <= 1282; i += 1) {
      txnCtyArr.push({
        category_id: 19,
        transaction_id: i,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    // subscriptions 25

    for (let i = 1; i <= 12; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "Spotify Shared",
        amount: 2.83,
        txn_date: faker.date.between(
          `2021-${i.toString().padStart(2, "0")}-05T00:00:00.000Z`,
          `2021-${i.toString().padStart(2, "0")}-10T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
      txnArr.push({
        user_id: 3,
        title: "iCloud 200GB",
        amount: 4.09,
        txn_date: faker.date.between(
          `2021-${i.toString().padStart(2, "0")}-05T00:00:00.000Z`,
          `2021-${i.toString().padStart(2, "0")}-10T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
      txnArr.push({
        user_id: 3,
        title: "Netflix Shared",
        amount: 5.5,
        txn_date: faker.date.between(
          `2021-${i.toString().padStart(2, "0")}-05T00:00:00.000Z`,
          `2021-${i.toString().padStart(2, "0")}-10T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 1; i <= 6; i += 1) {
      txnArr.push({
        user_id: 3,
        title: "Spotify Shared",
        amount: 2.83,
        txn_date: faker.date.between(
          `2022-${i.toString().padStart(2, "0")}-05T00:00:00.000Z`,
          `2022-${i.toString().padStart(2, "0")}-10T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
      txnArr.push({
        user_id: 3,
        title: "iCloud 200GB",
        amount: 4.09,
        txn_date: faker.date.between(
          `2022-${i.toString().padStart(2, "0")}-05T00:00:00.000Z`,
          `2022-${i.toString().padStart(2, "0")}-10T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
      txnArr.push({
        user_id: 3,
        title: "Netflix Shared",
        amount: 5.5,
        txn_date: faker.date.between(
          `2022-${i.toString().padStart(2, "0")}-05T00:00:00.000Z`,
          `2022-${i.toString().padStart(2, "0")}-10T23:59:59.999Z`
        ),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    for (let i = 1283; i <= 1336; i += 1) {
      txnCtyArr.push({
        category_id: 25,
        transaction_id: i,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("transactions", txnArr);

    await queryInterface.bulkInsert("transaction_categories", txnCtyArr);

    await queryInterface.bulkInsert("budgets", [
      {
        user_id: 3,
        category_id: 1,
        amount: 600,
        show_in_dashboard: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        category_id: 5,
        amount: 300,
        show_in_dashboard: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        category_id: 2,
        amount: 300,
        show_in_dashboard: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        category_id: 4,
        amount: 500,
        show_in_dashboard: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        category_id: 7,
        amount: 200,
        show_in_dashboard: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
