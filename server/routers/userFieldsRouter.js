const router = require('express').Router();
const { getUserFields, addToFavoriteArticles, addSearchTerm, removeFromFavoriteArticles, deleteSearchTerm, getUserFieldsByUserId } = require('../controllers/userFieldsController');
const validateToken = require('../middleware/validateTokenHandler');
router.use(validateToken);
router.route('/').get(getUserFields);
router.route('/user_id/:user_id').get(getUserFieldsByUserId); 
router.route('/favoriteArticles').post(addToFavoriteArticles).delete(removeFromFavoriteArticles);
router.route('/recentSearches').post(addSearchTerm);
router.route('/recentSearches/searchTerm/:searchTerm').delete(deleteSearchTerm);

module.exports = router;
