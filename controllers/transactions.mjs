export default function initTransactionController(db) {
  const index = async (req, res) => {
    try {
      const { id } = req.user;

      const transactions = await db.Transaction.findAll({
        where: { userId: id },
        include: { model: db.Category },
      });

      res.json({ transactions });
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

      res.json({ newTxn });
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
      if (!txn) return res.status(400).send("Bad Request");
      if (userId !== txn.userId) return res.status(403).send("Forbidden"); // return forbidden if transaction doesn't belong to current user

      res.json(txn);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const update = async (req, res) => {
    try {
      const { id: userId } = req.user;
      const { id: txnId } = req.params;
      const { amount, txnDate, title, categoryId } = req.body;

      const txn = await db.Transaction.findByPk(txnId);
      if (!txn) return res.status(400).send("Bad Request");
      if (userId !== txn.userId) return res.status(403).send("Forbidden"); // return forbidden if transaction doesn't belong to current user

      if (txn.categoryId !== categoryId) await txn.setCategories([categoryId]);

      await txn.update({
        amount,
        txnDate,
        title,
        updatedAt: new Date(),
      });

      res.json({ success: true });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const destroy = async (req, res) => {
    try {
      const { id: userId } = req.user;
      const { id: txnId } = req.params;

      const txn = await db.Transaction.findByPk(txnId);
      if (!txn) return res.status(400).send("Bad Request");
      if (userId !== txn.userId) return res.status(403).send("Forbidden"); // return forbidden if transaction doesn't belong to current user

      await txn.setCategories([]);
      await txn.destroy();

      res.json({ success: true });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  return { index, create, show, update, destroy };
}
