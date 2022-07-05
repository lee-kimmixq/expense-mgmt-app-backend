import { resolve } from "path";
import db from "./models/index.mjs";
import auth from "./utils/auth.js";

import initUserController from "./controllers/users.mjs";
import initTransactionController from "./controllers/transactions.mjs";

export default function routes(app) {
  const UserController = initUserController(db);
  app.post("/login", UserController.login);
  app.post("/signup", UserController.signup);
  app.delete("/logout", UserController.logout);
  app.get("/checkAuth", auth, UserController.checkAuth);

  const TransactionController = initTransactionController(db);
  app.get("/transactions", auth, TransactionController.index);
  app.post("/transactions", auth, TransactionController.create);
  app.get("/transactions/:id", auth, TransactionController.show);
  app.put("/transactions/:id", auth, TransactionController.update);
  app.delete("/transactions/:id", auth, TransactionController.destroy);

  // special JS page. Include the webpack index.html file
  app.get("/home", (request, response) => {
    response.sendFile(resolve("dist", "main.html"));
  });
}
