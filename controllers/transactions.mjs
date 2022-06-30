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
      if (!category) return res.status(400).send("Bad Request");

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

  const show = async (req, res) => {
    try {
      const { id: userId } = req.user;
      const { id } = req.params;

      const txn = await db.Transaction.findByPk(id, {
        include: {
          model: db.Category,
        },
      });

      if (userId !== txn.userId) return res.status(403).send("Forbidden"); // return forbidden if transaction doesn't belong to current user

      res.send(txn);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  return { index, create, show };
}
