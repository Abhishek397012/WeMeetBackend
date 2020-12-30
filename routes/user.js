const express = require('express');
const router = express.Router();

const {userById, update} = require('../controllers/user');
const {requireSignin} = require('../controllers/auth');

router.put('/:userId', requireSignin, update);

router.param("userId", userById)

module.exports = router;