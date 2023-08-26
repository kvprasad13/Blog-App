const express = require('express');
const router = express.Router();

const { getArticle, createArticle, updateArticle, deleteArticle, getArticles } = require('../controllers/articleControllers.js');
router.route('/').get(getArticles).post(createArticle);


router.route('/:articleId').get(getArticle).put(updateArticle).delete(deleteArticle);






module.exports = router;