const express = require('express');
const { homePage,matchTeam } = require('../controller/homeController');

let router = express.Router();

// router =============================================================================<
//page
router.get('/', homePage)

//detail page 
router.get('/match/team/:id', matchTeam);
module.exports = router;