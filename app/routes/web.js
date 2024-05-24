const express = require('express');
const { homePage,matchTeam,joinTeam } = require('../controller/homeController');

let router = express.Router();

// router =============================================================================<
//page
router.get('/', homePage)

//detail page 
router.get('/match/team/:id', matchTeam);

// handlers 
router.post('/match/:team/:id', joinTeam);

module.exports = router;