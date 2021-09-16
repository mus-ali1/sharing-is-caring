const express = require("express");
const path = require("path");
const app = express();
const sequelizeStore = require("connect-session-sequelize");
const session = require("express-session");

const dbConnection = require("./config/connection");

const routes = require("./controllers");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

dbConnection.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("server listening on port:" + PORT);
  });
});
