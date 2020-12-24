const express = require('express');
const router = express.Router();

const {helloWeMeet} = require('../controllers/wemeet');

router.get('/s', helloWeMeet)

module.exports = router;