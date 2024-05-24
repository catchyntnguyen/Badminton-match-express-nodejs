const express = require('express');
const { homePage,login, matchTeam,joinTeam, loginHandler, registerHandler, logOut  } = require('../controller/homeController');

let router = express.Router();

// router =============================================================================<
//page
router.get('/', homePage)
router.get("/login", login);
router.get("/logOut", logOut);

//detail page 
router.get('/match/team/:id', matchTeam);

// handlers 
router.post('/match/:team/:id', joinTeam);
router.post("/loginHandler", loginHandler);
router.post("/registerHandler", registerHandler);

module.exports = router;