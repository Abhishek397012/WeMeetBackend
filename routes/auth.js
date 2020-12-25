const express = require('express');
const router = express.Router();

const {login, signout, requireSignin} = require('../controllers/auth');

router.post('/login', login)
router.get('/signout', signout)

module.exports = router;