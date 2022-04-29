const express = require('express');

const recordRouter = require('./record');
const userAuthController = require('../controllers/userAuthController');
const userDataController = require('../controllers/userDataController');

const router = express.Router();

router.use('/me/records', recordRouter);

router.post("/register", userAuthController.registerUser);
router.post("/login", userAuthController.loginUser);
router.delete('/logout', userAuthController.logoutUser)

router.get("/me", userDataController.getUserData);
router.put('/edit', userDataController.updateUserData);


module.exports = router;