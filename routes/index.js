const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const orderRoute = require("./orderRoute");

// Make sure your routes come after the session middleware

const mountRoutes = (app) => {
  app.use("/auth", authRoute);
  app.use("/users", userRoute);
  app.use("/order", orderRoute);
};

module.exports = mountRoutes;
