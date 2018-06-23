const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const routes = require('./controllers/routes.js')
const port = 3000;

const bodyParser = require("body-parser");
const logger = require("morgan");

const mongoose = require("mongoose");

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(routes)
app.use(express.static("public"));

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

mongoose.connect("mongodb://localhost/nprScraper");

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});