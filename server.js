const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./models");

const port = 3000;

const app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/nprScraper");

app.get("/scrape", (req, res) => {
    axios.get("http://www.npr.org/").then(response => {
        const $ = cheerio.load(response.data);

        $("div a h3").each((i, element) => {
            let result = {};
            result.title = $(element).text();
            result.summary = $(element).parent().next().children('p').text()
            result.link = $(element).parent().attr("href");
            // console.log(result)

            db.Article.create(result)
                .then(dbArticle => {
                    console.log(dbArticle);
                })
                .catch(err => {
                    console.log(`ERROR:: ${err}`);
                });
        });
        res.send("Scrape Complete");
    });
});

// Route for getting all Articles from the db
app.get("/articles", (req, res) => {
    db.Article.find({})
        .then(dbArticle => {
            res.json(dbArticle);
        })
        .catch(err => {
            res.json(err);
        });
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req, res) {
    db.Article.findOne({
            _id: req.params.id
        })
        .populate("note")
        .then(dbArticle => {
            res.json(dbArticle);
        })
        .catch(err => {
            res.json(err);
        });
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", (req, res) => {
    db.Note.create(req.body)
        .then(dbNote => {
            return db.Article.findOneAndUpdate({
                _id: req.params.id
            }, {
                note: dbNote._id
            }, {
                new: true
            });
        })
        .then(dbArticle => {
            res.json(dbArticle);
        })
        .catch(err => {
            res.json(err);
        });
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});