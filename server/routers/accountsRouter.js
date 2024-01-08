const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateTokenHandler.js');
const { registerUser, loginUser, currentUser, getUserDetailsByUserId,getUserDetailsByUserName } = require('../controllers/userControllers.js');
const { addUserFields } = require('../controllers/userFieldsController.js');
router.post('/register', registerUser,addUserFields);
router.post('/login', loginUser);


router.get('/current', validateToken, currentUser);
router.get('/user/user_id/:user_id', getUserDetailsByUserId);
router.get('/user/username/:username', getUserDetailsByUserName);
module.exports = router;