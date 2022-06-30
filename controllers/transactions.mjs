export default function initTransactionController(db) {
  const index = async (req, res) => {
    try {
      const { id } = req.user;

      const transactions = await db.Transaction.findAll({
        where: { userId: id },
      });

      res.send({ transactions });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const create = async (req, res) => {
    try {
      const { id } = req.user;
      const { amount, txnDate, title, categoryId } = req.body;

      const category = await db.Category.findByPk(categoryId);
      if (!category) throw new Error("Invalid Category");

      const newTxn = await category.createTransaction({
        userId: id,
        amount,
        txnDate,
        title,
      });

      res.send({ newTxn });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  return { index, create };
}
