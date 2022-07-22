import express from "express";
import auth from "../utils/auth.js";

const router = express.Router();

export default function userRouter(controller) {
  router.post("/login", controller.login);
  router.post("/signup", controller.signup);
  router.delete("/logout", controller.logout);
  router.get("/confirm/:confirmationCode", controller.verifyUser);
  router.get("/checkAuth", auth, controller.checkAuth);
  router.get("/current", auth, controller.getUsername);

  return router;
}
