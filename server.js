const express = require("express");
const path = require("path");
const handlebars = require("express-handlebars");
const app = express();
const session = require("express-session");
const hbs = handlebars.create();

const dbConnection = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sessConfig = {
  secret: "this is the dream team's secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: dbConnection,
  }),
};
app.use(session(sessConfig));
const routes = require("./controllers");
const PORT = process.env.PORT || 3000;

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

dbConnection.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("server listening on port:" + PORT);
  });
});
