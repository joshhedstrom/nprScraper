const express = require('express');
const router = express.Router();
const db = require("../models");

const axios = require("axios");
const cheerio = require("cheerio");

router.get('/', (req, res) => {
    // res.redirect('/articles')
    res.render('index')
})

router.get("/scrape", (req, res) => {
    axios.get("http://www.npr.org/").then(response => {
        const $ = cheerio.load(response.data);

        $("div a h3").each((i, element) => {
            let result = {};
            result.title = $(element).text();
            result.summary = $(element).parent().next().children('p').text()
            result.link = $(element).parent().attr("href");

            db.Article.create(result)
                .then(dbArticle => {
                    // console.log(dbArticle);
                })
                .catch(err => {
                    console.log(`ERROR:: ${err}`);
                });
        });
        res.redirect('/articles');
    });
});

router.get("/articles", (req, res) => {
    db.Article.find({})
        .then(articles => {

            let comments = [{
                body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum culpa tempore, voluptates vitae. Deserunt numquam distinctio esse non quod dolorem excepturi tempore error perferendis adipisci, aspernatur dolores suscipit ipsam, maiores!',
                user: 'thisUser',
                time: 'July 4th, 1776'
            }]
            let dbArticles = {
                    articles: articles,
                    comments: comments,
                }
                // console.log(articles)
            res.render('articles', dbArticles);
        })
        .catch(err => {
            res.json(err);
        });
});

// Route for grabbing a specific Article by id, populate it with it's note
router.get("/articles/:id", function(req, res) {
    db.Article.findOne({
            _id: req.params.id
        })
        .populate("comment")
        .then(dbArticle => {
            console.log(dbArticle)
            res.render('articleComments', dbArticle);
        })
        .catch(err => {
            res.json(err);
        });
});

// Route for saving/updating an Article's associated Note
router.post("/articles/:id", (req, res) => {
    db.Comment.create(req.body)
        .then(dbNote => {
            return db.Article.findOneAndUpdate({
                _id: req.params.id
            }, {
                comment: dbComment._id
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

module.exports = router;