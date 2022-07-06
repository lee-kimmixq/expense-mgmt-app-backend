export default function initCategoryController(db) {
  const index = async (req, res) => {
    try {
      const { isIncome } = req.query;

      const options = {
        attributes: ["id", "name", "isIncome"],
      };

      if (isIncome !== undefined) options.where = { isIncome };

      const categories = await db.Category.findAll(options);

      const resBody = { categories };

      res.json(resBody);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  return { index };
}
