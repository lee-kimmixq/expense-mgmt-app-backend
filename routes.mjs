import db from "./models/index.mjs";

import userRouter from "./routers/userRouter.mjs";
import transactionRouter from "./routers/transactionRouter.mjs";
import categoryRouter from "./routers/categoryRouter.mjs";
import budgetRouter from "./routers/budgetRouter.mjs";

import initUserController from "./controllers/users.mjs";
import initTransactionController from "./controllers/transactions.mjs";
import initCategoryController from "./controllers/categories.mjs";
import initBudgetController from "./controllers/budgets.mjs";

export default function routes(app) {
  const UserController = initUserController(db);
  const TransactionController = initTransactionController(db);
  const CategoryController = initCategoryController(db);
  const BudgetController = initBudgetController(db);

  app.use("/users", userRouter(UserController));
  app.use("/transactions", transactionRouter(TransactionController));
  app.use("/categories", categoryRouter(CategoryController));
  app.use("/budgets", budgetRouter(BudgetController));
}
