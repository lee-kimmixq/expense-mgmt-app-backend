import getHash from "../utils/getHash.js";
import jwt from "jsonwebtoken";

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

      let payload = { id: user.id };
      let token = jwt.sign(payload, process.env.JWT_TOKEN_KEY);

      res.cookie("jwt", token);
      res.send({ login: true });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  return {
    login,
  };
}
