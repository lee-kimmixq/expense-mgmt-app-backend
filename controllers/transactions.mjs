import { Op } from "sequelize";

export default function initTransactionController(db) {
  const index = async (req, res) => {
    try {
      const { id } = req.user;
      const {
        fields,
        sort,
        limit,
        txnDateMin,
        txnDateMax,
        isIncome,
        amountMin,
        amountMax,
        category,
      } = req.query;

      // default options
      const options = {
        where: { userId: id },
        attributes: [
          "id",
          "title",
          "amount",
          "txnDate",
          "createdAt",
          "updatedAt",
        ],
      };

      if (fields) {
        const attributes = fields.filter((field) => field !== "category"); // remove "category" from fields
        if (attributes.length > 0) options.attributes = attributes; // if there are attributes, replace default attributes with specified attributes
        if (attributes.length !== fields.length)
          options.include = {
            model: db.Category,
            attributes: ["id", "name", "isIncome"],
            through: { attributes: [] },
          }; // if "category" was removed, add include clause into options
      }

      if (category) {
        if (Array.isArray(category)) {
          options.include.where = {
            [Op.or]: category.map((cty) => {
              return { id: cty };
            }),
          };
        } else {
          options.include.where = { id: category };
        }
      }

      if (sort) options.order = [sort.split(":")];

      if (limit) options.limit = limit;

      if (txnDateMax) options.where.txnDate = { [Op.lt]: txnDateMax };

      if (txnDateMin) options.where.txnDate = { [Op.gt]: txnDateMin };

      if (amountMax) options.where.amount = { [Op.lt]: amountMax };

      if (amountMin) options.where.amount = { [Op.gt]: amountMin };

      if (isIncome !== undefined) options.include.where = { isIncome };

      const transactions = await db.Transaction.findAll(options);

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

  const calcTotal = async (req, res) => {
    try {
      const { id } = req.user;
      const { txnDateMin, txnDateMax, categoryBreakdown } = req.query;

      const options = {
        where: { userId: id },
        attributes: ["amount", "txnDate"],
        include: {
          model: db.Category,
          attributes: ["id", "name", "isIncome"],
          through: { attributes: [] },
        },
      };

      if (txnDateMax) options.where.txnDate = { [Op.lt]: txnDateMax };

      if (txnDateMin) options.where.txnDate = { [Op.gt]: txnDateMin };

      const transactions = await db.Transaction.findAll(options);

      const totalAmount = transactions
        .reduce(
          (sum, txn) =>
            Number(sum) +
            Number(txn.amount) * (txn.categories[0].isIncome ? -1 : 1),
          0
        )
        .toFixed(2);

      const resBody = { totalAmount };

      if (categoryBreakdown) {
        const totalAmountByCategory = {};
        transactions.forEach((txn) => {
          const categoryName = txn.categories[0].name;
          if (!totalAmountByCategory[categoryName])
            totalAmountByCategory[categoryName] = 0;
          totalAmountByCategory[categoryName] +=
            Number(txn.amount) * (txn.categories[0].isIncome ? -1 : 1);
        });

        for (const category in totalAmountByCategory) {
          totalAmountByCategory[category] =
            totalAmountByCategory[category].toFixed(2);
        }

        resBody.totalAmountByCategory = totalAmountByCategory;
      }

      res.json(resBody);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  return { index, create, show, update, destroy, calcTotal };
}
