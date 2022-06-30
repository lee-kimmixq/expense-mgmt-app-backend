import { resolve } from "path";
import db from "./models/index.mjs";
import passport from "passport";

import initUserController from "./controllers/users.mjs";
import initTransactionController from "./controllers/transactions.mjs";

export default function routes(app) {
  const UserController = initUserController(db);
  app.post("/login", UserController.login);
  app.post("/signup", UserController.signup);
  app.delete("/logout", UserController.logout);

  const TransactionController = initTransactionController(db);
  app.get(
    "/transactions",
    passport.authenticate("jwt", { session: false }),
    TransactionController.index
  );
  app.post(
    "/transactions",
    passport.authenticate("jwt", { session: false }),
    TransactionController.create
  );
  app.get(
    "/transactions/:id",
    passport.authenticate("jwt", { session: false }),
    TransactionController.show
  );
  app.put(
    "/transactions/:id",
    passport.authenticate("jwt", { session: false }),
    TransactionController.update
  );
  app.delete(
    "/transactions/:id",
    passport.authenticate("jwt", { session: false }),
    TransactionController.destroy
  );

  // special JS page. Include the webpack index.html file
  app.get("/home", (request, response) => {
    response.sendFile(resolve("dist", "main.html"));
  });
}
