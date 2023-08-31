const asyncHandler = require('express-async-handler');
const Article = require('../models/articleModel.js');
const getArticles = asyncHandler(async (req, res) => {
    const articles = await Article.find();
    if (articles == null) {
        res.status(404).send("No articles found");
    }
    else
        res.status(200).json(articles);
});
const getArticle = asyncHandler(async (req, res) => {
    const { articleId } = req.params;
    // console.log(articleId);
    const article = await Article.findById({ _id: articleId });
    // console.log(article);
    if (article) {
        res.status(200).json(article);

    }
    else {

        res.status(404).send(`Article which have id ${articleId} not found`);
    }
    // res.send("get articles");
});
const createArticle = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { title, content } = req.body;

    if (!title || !content) {
        res.status(400).send("All fields are mandatory.");
        throw new Error("All fields are mandatory.");
    }
    const article = await Article.findOne({ title });
    if (article) {
        res.status(201);
        throw new Error("article already exists");
    }
    else {
        const article = await Article.create({ title, content });
        res.status(200).json(article);
    }

});
const updateArticle = asyncHandler(async(req, res) => {
    const { articleId } = req.params;
    
    const article = await Article.findById({ _id: articleId });
    if (!article) {
        res.status(404).send(`Article not found for id ${articleId}`);
    }
    
    const updatedArticle = await Article.findByIdAndUpdate(articleId, req.body, { new: true });
    res.status(200).send(updatedArticle);
});
const deleteArticle = asyncHandler(async (req, res) => {


    const { articleId } = req.params;
    const article = await Article.findById({ _id: articleId });
    if (!article) {
        res.status(404).send(`Article not found for id ${articleId}`);
    }
    else {
        await Article.deleteOne({ _id: articleId });
        res.status(200).send(`Article deleted successfully for id ${articleId}`);

    }

});

module.exports = { getArticle, createArticle, updateArticle, deleteArticle, getArticles }

