// TEST - TO REMOVE
export default function initTestController(db) {
  const test = (request, response) => {
    response.send("hello from test controller");
  };

  return {
    test,
  };
}
