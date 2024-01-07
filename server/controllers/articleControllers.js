const asyncHandler = require('express-async-handler');
const Article = require('../models/articleModel.js');
const Comment = require('../models/commentModel.js');
//@desc retrieve articles
//@route retrieve  /api/articles/
//@access private
const getArticles = asyncHandler(async (req, res) => {
    const articles = await Article.find();
    // console.log(articles);
    if (articles == null) {
        res.status(404).send("No articles found");
    }
    else
        res.status(200).json(articles);
});
const getUserArticles = asyncHandler(async (req, res) => {
    const articles = await Article.find({ user_id: req.user.id });
    if (articles == null) {
        res.status(404).send("No articles found");
    }
    else
        res.status(200).json(articles);
});

//@desc retrieve article
//@route retrieve  /api/articles/:articleId
//@access private
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
//@desc create article
//@route create  /api/articles/
//@access private
const createArticle = asyncHandler(async (req, res) => {

    const { title, content } = req.body;
    console.log({ user: req.user, body: req.body });
    if (!title || !content) {
        res.status(400);
        throw new Error("All fields are mandatory.");
    }
    if (await Article.findOne({ title, content })) {
        res.status(409).send("Article already exists");
        return;
    }


    const article = await Article.create({ title, content, user_id: req.user.id, username: req.user.username });
    res.status(201).json(article);


});
//@desc update article
//@route update  /api/articles/:articleId
//@access private
const updateArticle = asyncHandler(async (req, res) => {
    const { articleId } = req.params;

    const article = await Article.findById({ _id: articleId });
    if (!article) {
        res.status(404);
        throw new Error("Article not found");
    }
    if (article.user_id.toString() !== req.user.id) {
        res.status(403).send("User don't have permission to update other user article");

    }

    const updatedArticle = await Article.findByIdAndUpdate(articleId, req.body, { new: true });
    res.status(200).send(updatedArticle);
});
//@desc delete article
//@route delete  /api/articles/:articleId
//@access private
const deleteArticle = asyncHandler(async (req, res) => {

    console.log("delete article\n");
    const { articleId } = req.params;
    const article = await Article.findById({ _id: articleId });
    if (!article) {
        res.status(404);
        throw new Error("Article not found");
    }
    if (article.user_id.toString() !== req.user.id) {
        res.status(403).send("User don't have permission to delete other user article");

    }
    else {
        try {
            await Comment.deleteMany({ article_id: articleId });
            await Article.deleteOne({ _id: articleId });
            res.status(200).send(`Article deleted successfully for id ${articleId}`);
        }
        catch (err) {
            res.status(500).json({ "Error":"Internal Server Error"});
        }
    }

});

const Search = asyncHandler(async (req, res) => {


    try {

        const articles = await Article.aggregate([{
            '$search': {
                'index': 'search-text',
                'text': {
                    'query': req.query.t,
                    'path': {
                        'wildcard': '*'
                    }
                }
            }
        }]);





        res.status(200).send(articles);

    }
    catch (err) {
        res.status(404).send("something happened at searching" + err.message);
    }

});

const getClapCount = asyncHandler(async (req, res) => {
    const { articleId } = req.params;
    const userId = req.user.id;
    console.log({ articleId, userId });
    if (!articleId || !userId) {

        res.status(400).json({ error: "All fields are required" });

    }
    try {
        const article = await Article.findById({ _id: articleId });
        res.status(200).json({ claps: article.claps});

    } catch (error) {
        res.status(500).send({ error });

    }

}); const updateClaps = asyncHandler(async (req, res) => {
    try {
        const { articleId } = req.params;
        const userId = req.user.id;

        if (!articleId || !userId) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const article = await Article.findById(articleId);

        if (!article) {
            return res.status(404).json({ error: "Article not found" });
        }

        const isUserClapping = article.claps.includes(userId);

        let updatedArticle;

        if (isUserClapping) {
            // User is already clapping, remove the userId from claps
            updatedArticle = await Article.findByIdAndUpdate(
                articleId,
                { $pull: { claps: userId } },
                { new: true }
            );
        } else {
            // User is not clapping, add the userId to claps
            updatedArticle = await Article.findByIdAndUpdate(
                articleId,
                { $addToSet: { claps: userId } },
                { new: true }
            );
        }

        res.status(200).json({ claps: updatedArticle.claps });
    } catch (error) {
        console.error("Error in updateClaps:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = { getArticle, createArticle, updateArticle, deleteArticle, getUserArticles, getArticles, Search, getClapCount, updateClaps }

