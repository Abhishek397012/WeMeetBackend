const express = require('express');
const router = express.Router();

const {login, signout} = require('../controllers/user');

router.post('/login', login)
router.get('/signout', signout)

module.exports = router;