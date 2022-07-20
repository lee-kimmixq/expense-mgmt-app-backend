const getBreakdown = (transactions) => {
  const amountTally = {};
  const categoryMap = {};
  transactions.forEach((txn) => {
    categoryMap[txn.categories[0].name] = txn.categories[0].id;
    const categoryName = txn.categories[0].name;
    if (!amountTally[categoryName]) amountTally[categoryName] = 0;
    amountTally[categoryName] += Number(txn.amount);
  });

  for (const category in amountTally) {
    amountTally[category] = amountTally[category].toFixed(2);
  }

  const totalAmountByCategory = [];
  for (const category in amountTally) {
    totalAmountByCategory.push({
      id: categoryMap[category],
      name: category,
      total: amountTally[category],
    });
  }
  return totalAmountByCategory;
};
module.exports = getBreakdown;
