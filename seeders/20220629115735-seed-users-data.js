// import getHash from "../utils/getHash.mjs";
const getHash = require("../utils/getHash.js");

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("users", [
      {
        username: "John Tan",
        email: "johntan@makecents.com",
        contact: "12345678",
        password: getHash("johntan"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "Jane Lim",
        email: "janelim@makecents.com",
        contact: "23456789",
        password: getHash("janelim"),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", null);
  },
};
