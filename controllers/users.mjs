import getHash from "../utils/getHash.js";
import jwt from "jsonwebtoken";

export default function initUserController(db) {
  const login = async (req, res) => {
    try {
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

      const payload = { id: user.id };
      const token = jwt.sign(payload, process.env.JWT_TOKEN_KEY);
      const cookieOptions = { httpOnly: true };

      res.cookie("jwt", token, cookieOptions);
      res.send({ login: true });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  return {
    login,
  };
}
