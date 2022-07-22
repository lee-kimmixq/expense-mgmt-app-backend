import getHash from "../utils/getHash.js";
import jwt from "jsonwebtoken";
import sendConfirmationEmail from "../config/nodemailer.config.js";

export default function initUserController(db) {
  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await db.User.findOne({ where: { email } });

      if (!user) {
        res.status(401).send({ message: "Wrong username or password" });
        return;
      }

      if (user.status != "Active") {
        return res.status(401).send({
          message: "Please check your inbox to confirm your account.",
        });
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

  const signup = async (req, res) => {
    try {
      const { username, email, contact, password } = req.body;
      const hashedPassword = getHash(password);
      const confirmationCode = getHash(email);
      await db.User.create({
        username,
        email,
        contact,
        confirmationCode,
        password: hashedPassword,
      });

      const response = sendConfirmationEmail(username, email, confirmationCode);

      res.send({ signup: true });
    } catch (err) {
      console.log("error =", err);
      res.status(500).send(err);
    }
  };

  const logout = async (_, res) => {
    res.clearCookie("jwt");
    res.send({ logout: true });
  };

  const verifyUser = async (req, res) => {
    try {
      const { confirmationCode } = req.params;
      const user = await db.User.findOne({ where: { confirmationCode } });

      if (!user) {
        res.status(404).send("User not found");
        console.log("res404", res);
        return;
      }

      await user.update({ status: "Active", updatedAt: new Date() });

      res.send({ verified: true });
      console.log(res);
    } catch (err) {
      res.status(500).send(err);
      console.log("error", err);
    }
  };

  const checkAuth = async (req, res) => {
    res.send({ auth: true });
  };

  const getUsername = async (req, res) => {
    const { username } = req.user;
    res.json({ username });
  };

  return { login, signup, logout, verifyUser, checkAuth, getUsername };
}
