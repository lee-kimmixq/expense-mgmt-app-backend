import express from "express";
import auth from "../utils/auth.js";

const router = express.Router();

export default function transactionRouter(controller) {
  router.get("/", auth, controller.index);
  router.post("/", auth, controller.create);
  router.get("/:id", auth, controller.show);
  router.put("/:id", auth, controller.update);
  router.delete("/:id", auth, controller.destroy);

  return router;
}
