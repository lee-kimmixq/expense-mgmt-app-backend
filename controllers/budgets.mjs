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
        },
        attributes: [
          [
            sequelize.fn("DISTINCT", sequelize.col("category_id")),
            "categoryId",
          ],
          "id",
          "amount",
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

  return { index, create };
}
