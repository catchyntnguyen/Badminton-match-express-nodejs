const express = require('express');
const { homePage,login, matchTeam,joinTeam, historyPage, createMatch, postcreateMatch, historyDetail } = require('../controller/homeController');

let router = express.Router();

// router =============================================================================<
//page
router.get('/', homePage)
router.get("/login", login);
router.get('/createMatch', createMatch);
router.get('/history', historyPage)
//detail page 
router.get('/match/team/:id', matchTeam);
router.get('/history/:id', historyPage);
// handlers 
router.post('/match/:team/:id', joinTeam);
router.post('/createMatch', postcreateMatch);

module.exports = router;