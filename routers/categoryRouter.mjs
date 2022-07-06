import express from "express";
import auth from "../utils/auth.js";

const router = express.Router();

export default function categoryRouter(controller) {
  router.get("/", auth, controller.index);

  return router;
}
