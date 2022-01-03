const express = require("express");
const userAction = require("../../controllers/users/userController");
const router = express.Router();
require('../../middleware/passport');
const isLoggedIn = require('../../middleware/0Auth')




router.get('/users',  isLoggedIn , userAction.getAllUsers);
router.get('/users/:email', isLoggedIn, userAction.getUserSpec);
router.post('/users/register', userAction.createUser);
router.post('/users/login', userAction.login);
router.post('/users/token', userAction.refresh);
router.post('/users/logout', userAction.logout);
// router.patch('/:id', userAction.updateUser);
// router.delete('/:id', userAction.deleteUser);

module.exports = router;


