import getHash from "../utils/getHash.js";

export default function initUserController(db) {
  const login = async (req, res) => {
    try {
      // console.log(req);
      const { email, password } = req.body;
      const user = await db.User.findOne({ where: { email } });

      if (!user) {
        res.status(401).send("Wrong username or password");
        return;
      }

      if (user.password !== getHash(password)) {
        res.status(401).send("Wrong username or password");
        return;
      }

      res.send({ login: true });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  return {
    login,
  };
}
