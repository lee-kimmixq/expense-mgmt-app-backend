module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("categories", [
      {
        name: "Food & Drinks",
        is_income: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Taxi",
        is_income: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Public Transport",
        is_income: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Shopping",
        is_income: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Groceries",
        is_income: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Gifts & Charity",
        is_income: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Entertainment",
        is_income: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Others",
        is_income: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Auto & Parking",
        is_income: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Bills",
        is_income: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Business",
        is_income: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Cash & Cheque",
        is_income: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Education",
        is_income: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Family",
        is_income: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Fees",
        is_income: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Investments",
        is_income: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Fuel",
        is_income: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Health",
        is_income: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Insurance",
        is_income: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Kids",
        is_income: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Loans",
        is_income: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Personal Care",
        is_income: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Pets",
        is_income: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Rental",
        is_income: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Subscriptions",
        is_income: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Taxes",
        is_income: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Travel",
        is_income: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Bonuses",
        is_income: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Deposits",
        is_income: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Investments",
        is_income: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Refunds",
        is_income: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Salaries",
        is_income: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Other Income",
        is_income: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("categories", null);
  },
};
