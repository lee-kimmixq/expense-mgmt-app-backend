import sequelize, { Op } from "sequelize";

export default function initBudgetController(db) {
  const index = async (req, res) => {
    try {
      const { id } = req.user;
      const { showInDashboard } = req.query;

      const options = {
        where: {
          userId: id,
          id: {
            [Op.in]: sequelize.literal(
              `(SELECT MAX(id) FROM budgets GROUP BY category_id)`
            ),
          },
          amount: {
            [Op.gt]: 0,
          },
        },
        attributes: [
          [
            sequelize.fn("DISTINCT", sequelize.col("category_id")),
            "categoryId",
          ],
          "id",
          "amount",
          "showInDashboard",
        ],
        include: {
          model: db.Category,
          attributes: ["name"],
          where: { isIncome: false },
        },
        raw: true,
      };

      if (showInDashboard) options.where.showInDashboard = true;

      const budgets = await db.Budget.findAll(options);

      res.json({ budgets });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const create = async (req, res) => {
    try {
      const { id } = req.user;
      const { categoryId, amount } = req.body;

      const newBudget = await db.Budget.create({
        userId: id,
        categoryId,
        amount,
      });

      res.json({ newBudget });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const update = async (req, res) => {
    try {
      const { id: userId } = req.user;
      const { id: budgetId } = req.params;
      const { showInDashboard } = req.body;

      const budget = await db.Budget.findByPk(budgetId);
      if (!budget) return res.status(400).send("Bad Request");
      if (userId !== budget.userId) return res.status(403).send("Forbidden"); // return forbidden if transaction doesn't belong to current user

      if (showInDashboard === "true") {
        const numPinned = await db.Budget.count({
          where: { userId, showInDashboard: true },
        });
        if (numPinned >= 3) return res.json({ update: false });
      }

      await budget.update({ showInDashboard, updatedAt: new Date() });

      res.json({ update: true });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const deactivate = async (req, res) => {
    try {
      const { id: userId } = req.user;
      const { id: budgetId } = req.params;

      const budget = await db.Budget.findByPk(budgetId);
      if (!budget) return res.status(400).send("Bad Request");
      if (userId !== budget.userId) return res.status(403).send("Forbidden"); // return forbidden if transaction doesn't belong to current user

      const newBlankBudget = await db.Budget.create({
        userId,
        categoryId: budget.categoryId,
        amount: 0,
        showInDashboard: false,
      });

      res.json({ deactivate: true, newBlankBudget });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  return { index, create, update, deactivate };
}
