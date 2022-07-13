import express from "express";
import auth from "../utils/auth.js";

const router = express.Router();

export default function budgetRouter(controller) {
  router.get("/", auth, controller.index);
  router.post("/", auth, controller.create);
  router.put("/:id", auth, controller.update);

  return router;
}
