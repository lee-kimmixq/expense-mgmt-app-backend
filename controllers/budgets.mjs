export default function initBudgetController(db) {
  const index = async (req, res) => {
    try {
      const { id } = req.user;

      const budgets = await db.Budget.findAll({
        where: { userId: id },
      });

      res.json({ budgets });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  return { index };
}
