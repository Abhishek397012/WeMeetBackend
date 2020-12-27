const express = require('express');
const router = express.Router();

const {CreateWeMeet} = require('../controllers/wemeet');

router.post('/create', CreateWeMeet)

module.exports = router;