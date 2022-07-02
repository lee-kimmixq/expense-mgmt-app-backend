const getBreakdown = (transactions) => {
  const totalAmountByCategory = {};
  transactions.forEach((txn) => {
    const categoryName = txn.categories[0].name;
    if (!totalAmountByCategory[categoryName])
      totalAmountByCategory[categoryName] = 0;
    totalAmountByCategory[categoryName] += Number(txn.amount);
  });

  for (const category in totalAmountByCategory) {
    totalAmountByCategory[category] =
      totalAmountByCategory[category].toFixed(2);
  }

  return totalAmountByCategory;
};
module.exports = getBreakdown;
