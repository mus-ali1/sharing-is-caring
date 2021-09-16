const express = require("express");
const path = require("path");
const handlebars = require("express-handlebars");
const app = express();
const sequelizeStore = require("connect-session-sequelize");
const session = require("express-session");
const hbs = handlebars.create();

const dbConnection = require("./config/connection");

const routes = require("./controllers");
const app = express();
const PORT = process.env.PORT || 3000;

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

dbConnection.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("server listening on port:" + PORT);
  });
});
