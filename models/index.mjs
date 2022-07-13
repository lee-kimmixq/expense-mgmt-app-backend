import { Sequelize } from "sequelize";
import url from "url";
import allConfig from "../config/config.js";

import initUserModel from "./user.mjs";
import initCategoryModel from "./category.mjs";
import initTransactionModel from "./transaction.mjs";
import initBudgetModel from "./budgets.mjs";

const env = process.env.NODE_ENV || "development";

const config = allConfig[env];

const db = {};

let sequelize;

if (env === "production") {
  // break apart the Heroku database url and rebuild the configs we need

  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(":"));
  const password = dbUrl.auth.substr(
    dbUrl.auth.indexOf(":") + 1,
    dbUrl.auth.length
  );
  const dbName = dbUrl.path.slice(1);

  const host = dbUrl.hostname;
  const { port } = dbUrl;

  config.host = host;
  config.port = port;

  sequelize = new Sequelize(dbName, username, password, config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

db.User = initUserModel(sequelize, Sequelize.DataTypes);
db.Category = initCategoryModel(sequelize, Sequelize.DataTypes);
db.Transaction = initTransactionModel(sequelize, Sequelize.DataTypes);
db.Budget = initBudgetModel(sequelize, Sequelize.DataTypes);

db.User.hasMany(db.Transaction);
db.Transaction.belongsTo(db.User);

db.Transaction.belongsToMany(db.Category, {
  through: "transaction_categories",
});
db.Category.belongsToMany(db.Transaction, {
  through: "transaction_categories",
});

db.User.hasMany(db.Budget);
db.Budget.belongsTo(db.User);
db.Category.hasMany(db.Budget);
db.Budget.belongsTo(db.Category);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
