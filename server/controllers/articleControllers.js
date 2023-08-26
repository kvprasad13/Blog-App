const asyncHandler = require('express-async-handler');
const Article = require('../models/articleModel.js');
const getArticles =asyncHandler( async(req, res) => {
    const articles = await Article.find();
    if (articles == null) {
        res.status(404).send("No articles found");
    }
    else
        res.send(articles);
});
const getArticle = (req, res) => { res.send("get articles"); };
const createArticle = (req, res) => {
    // const { title, content } = req.params.body;
    console.log(req.params.body);
    // const article = await Article.findOne({ title });
    // if (article)
    // {
    //     res.status(200);
    //     throw  Error("article already exists");
    // }

    // res.status(200).send(`Article title ${title}that has been createed successfully`);
};
const updateArticle = (req, res) => { res.send("update article") };
const deleteArticle = (req, res) => { res.send("delete article") };

module.exports = { getArticle, createArticle, updateArticle, deleteArticle, getArticles }

