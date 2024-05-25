const express = require('express');
const { homePage,login, matchTeam,joinTeam, historyPage, createMatch, postcreateMatch, historyDetail, loginHandler, registerHandler, logOut, editMatch, PosteditMatch } = require('../controller/homeController');

let router = express.Router();

// router =============================================================================<
//page
router.get('/', homePage)
router.get("/login", login);
router.get('/createMatch', createMatch);
router.get('/history', historyPage)
router.get("/logOut", logOut);

//detail page 
router.get('/match/team/:id', matchTeam);
router.get('/history/:id', historyDetail);
router.get('/editMatch/:id', editMatch);
// handlers 
router.post('/match/:team/:id', joinTeam);
router.post('/editMatch/:id', PosteditMatch);
router.post('/createMatch', postcreateMatch);
router.post("/loginHandler", loginHandler);
router.post("/registerHandler", registerHandler);

module.exports = router;