const express = require('express');
const { homePage } = require('../controller/homeController');

let router = express.Router();

// router =============================================================================<
router.get('/', homePage)


module.exports = router;