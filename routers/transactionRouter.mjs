import express from "express";
import auth from "../utils/auth.js";
import multerUpload from "../middleware/s3.js";

const router = express.Router();

export default function transactionRouter(controller) {
  router.get("/reports", auth, controller.report);
  router.get("/", auth, controller.index);
  router.post("/", auth, multerUpload.single("photo"), controller.create);
  router.get("/:id", auth, controller.show);
  router.put("/:id", auth, controller.update);
  router.delete("/:id", auth, controller.destroy);

  return router;
}
