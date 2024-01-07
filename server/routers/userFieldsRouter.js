const router = require('express').Router();
const { getUserFields, addToFavoriteArticles, addSearchTerm, removeFromFavoriteArticles } = require('../controllers/userFieldsController');
const validateToken = require('../middleware/validateTokenHandler');
router.use(validateToken);
router.route('/').get( getUserFields);
router.route('/favoriteArticles').post(addToFavoriteArticles).delete(removeFromFavoriteArticles);
router.route('/recentSearches').post(addSearchTerm);

module.exports = router;
