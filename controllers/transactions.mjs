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

  return { index };
}
