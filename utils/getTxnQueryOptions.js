const { Op } = require("sequelize");

const getTxnQueryOptions = (db, userId, queryParams) => {
  const {
    fields,
    sort,
    limit,
    txnDateMin,
    txnDateMax,
    isIncome,
    amountMin,
    amountMax,
    category,
  } = queryParams;

  const defaultAttributes = [
    "id",
    "title",
    "amount",
    "txnDate",
    "imageUrl",
    "createdAt",
    "updatedAt",
  ];

  // default option
  const options = {
    where: { userId },
  };

  if (fields) {
    const attributes = fields.filter((field) => field !== "category"); // remove "category" from fields
    options.attributes = attributes.length > 0 ? attributes : defaultAttributes; // if there are attributes, replace default attributes with specified attributes
    if (attributes.length !== fields.length)
      options.include = {
        model: db.Category,
        attributes: ["id", "name", "isIncome"],
        through: { attributes: [] },
      }; // if "category" was removed, add include clause into options
  }

  if (category) {
    options.include.where = {
      [Op.or]: JSON.parse(decodeURI(category)).map((cty) => {
        return { id: cty };
      }),
    };
  }

  if (sort) options.order = [sort.split(":")];

  if (limit) options.limit = limit;

  if (txnDateMax && txnDateMin) {
    options.where.txnDate = {
      [Op.and]: { [Op.lt]: txnDateMax, [Op.gt]: txnDateMin },
    };
  } else {
    if (txnDateMax) options.where.txnDate = { [Op.lt]: txnDateMax };
    if (txnDateMin) options.where.txnDate = { [Op.gt]: txnDateMin };
  }

  if (amountMax && amountMin) {
    options.where.amount = {
      [Op.and]: { [Op.lt]: amountMax, [Op.gt]: amountMin },
    };
  } else {
    if (amountMax) options.where.amount = { [Op.lt]: amountMax };
    if (amountMin) options.where.amount = { [Op.gt]: amountMin };
  }

  if (isIncome !== undefined) options.include.where = { isIncome };

  return options;
};

module.exports = getTxnQueryOptions;
