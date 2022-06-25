import { resolve } from "path";
import db from "./models/index.mjs";

import initTestController from "./controllers/testController.mjs"; // TEST - TO REMOVE

export default function routes(app) {
  // TEST - TO REMOVE
  const TestController = initTestController(db);
  app.get("/test", TestController.test);

  // special JS page. Include the webpack index.html file
  app.get("/home", (request, response) => {
    response.sendFile(resolve("dist", "main.html"));
  });
}
