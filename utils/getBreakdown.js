const getBreakdown = (transactions) => {
  const amountTally = {};
  transactions.forEach((txn) => {
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
      name: category,
      total: amountTally[category],
    });
  }

  return totalAmountByCategory;
};
module.exports = getBreakdown;