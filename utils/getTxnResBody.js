const getTotalAmount = require("./getTotalAmount.js");
const getBreakdown = require("./getBreakdown.js");

const getTxnResBody = (transactions, queryParams, username) => {
  const { includeUser, includeTotal, includeBreakdown, includeTransactions } =
    queryParams;

  const resBody = {};

  if (includeUser) resBody.user = username;
  if (includeTransactions) resBody.transactions = transactions;
  if (includeTotal) resBody.totalAmount = getTotalAmount(transactions);
  if (includeBreakdown) resBody.breakdown = getBreakdown(transactions);

  return resBody;
};

module.exports = getTxnResBody;
