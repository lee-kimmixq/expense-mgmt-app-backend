import db from "./models/index.mjs";

import userRouter from "./routers/userRouter.mjs";
import transactionRouter from "./routers/transactionRouter.mjs";

import initUserController from "./controllers/users.mjs";
import initTransactionController from "./controllers/transactions.mjs";

export default function routes(app) {
  const UserController = initUserController(db);
  const TransactionController = initTransactionController(db);

  app.use("/users", userRouter(UserController));
  app.use("/transactions", transactionRouter(TransactionController));
}
