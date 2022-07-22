import sequelize, { Op } from "sequelize";
import getBreakdown from "../utils/getBreakdown.js";

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

      const categoryIdArr = budgets.map((budget) => {
        return { id: budget.categoryId };
      });
      const date = new Date();
      const txnDateMin = new Date(date.getFullYear(), date.getMonth(), 1);
      const txnDateMax = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      txnDateMin.setHours(0, 0, 0, 0);
      txnDateMax.setHours(23, 59, 59, 999);

      const txnQueryOptions = {
        where: {
          userId: id,
          txnDate: {
            [Op.and]: { [Op.lt]: txnDateMax, [Op.gt]: txnDateMin },
          },
        },
        attributes: ["id", "title", "amount", "txnDate"],
        include: {
          model: db.Category,
          attributes: ["id", "name", "isIncome"],
          through: { attributes: [] },
          where: { [Op.or]: categoryIdArr },
        },
      };

      const transactions = await db.Transaction.findAll(txnQueryOptions);
      const breakdown = getBreakdown(transactions);

      const budgetsWithTotalAmt = budgets.map((budget) => {
        const filterResults = breakdown.filter(
          (el) => el.name === budget["category.name"]
        );
        if (filterResults.length === 0) {
          budget.total = 0;
        } else {
          budget.total = filterResults[0].total;
        }
        return budget;
      });

      res.json({ budgets: budgetsWithTotalAmt });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const create = async (req, res) => {
    try {
      const { id } = req.user;
      const { categoryId, amount } = req.body;

      const latestBudget = await db.Budget.findOne({
        where: { categoryId },
        sort: [["createdAt", "DESC"]],
      });

      const newBudget = await db.Budget.create({
        userId: id,
        categoryId,
        amount,
        showInDashboard: latestBudget.showInDashboard,
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

      if (showInDashboard === true) {
        const options = {
          where: {
            userId,
            id: {
              [Op.in]: sequelize.literal(
                `(SELECT MAX(id) FROM budgets GROUP BY category_id)`
              ),
            },
            amount: {
              [Op.gt]: 0,
            },
            showInDashboard: true,
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

        const budgets = await db.Budget.findAll(options);

        if (budgets.length >= 3) return res.json({ update: false });
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
