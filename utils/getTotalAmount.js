const getTotalAmount = (transactions) =>
  transactions
    .reduce((sum, txn) => Number(sum) + Number(txn.amount), 0)
    .toFixed(2);
module.exports = getTotalAmount;
