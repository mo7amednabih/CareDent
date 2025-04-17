const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const orderRoute = require("./orderRoute");
const reviewRoute = require("./reviewStudentRoute");

// Make sure your routes come after the session middleware

const mountRoutes = (app) => {
  app.use("/auth", authRoute);
  app.use("/users", userRoute);
  app.use("/order", orderRoute);
  app.use("/review", reviewRoute);
};

module.exports = mountRoutes;
