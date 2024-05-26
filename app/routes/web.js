const express = require("express");
const {
  homePage,
  login,
  matchTeam,
  joinTeam,
  historyPage,
  createMatch,
  postcreateMatch,
  historyDetail,
  loginHandler,
  registerHandler,
  logOut,
  editMatch,
  PosteditMatch,
  filterMissing,
  filterDay,
  filterDone,
  filterMatchSingle,
  filterMatchCouple,
  historyFilterMatchSingle,
  historyFilterMatchCouple,
  filterHistoryDay,
  yourMatch,
  infomation,
  updateFormInfo1,
  updateFormInfo2,
} = require("../controller/homeController");

let router = express.Router();

// router =============================================================================<
//page
router.get("/", homePage);
router.get("/login", login);
router.get("/createMatch", createMatch);
router.get("/history", historyPage);
router.get("/logOut", logOut);
router.get("/info", infomation);
//filter
router.get("/filterMissing", filterMissing);
router.get("/filterDay", filterDay);
router.get("/filterHistoryDay", filterHistoryDay);
router.get("/filterDone", filterDone);
router.get("/filter_Match_Single", filterMatchSingle);
router.get("/filter_Match_Couple", filterMatchCouple);
router.get("/history/filter_Match_Single", historyFilterMatchSingle);
router.get("/history/filter_Match_Couple", historyFilterMatchCouple);
//detail page
router.get("/match/team/:id", matchTeam);
router.get("/history/:id", historyDetail);
router.get("/editMatch/:id", editMatch);
router.get("/yourMatch", yourMatch);
// handlers
router.post("/match/:team/:id", joinTeam);
router.post("/editMatch/:id", PosteditMatch);
router.post("/createMatch", postcreateMatch);
router.post("/loginHandler", loginHandler);
router.post("/registerHandler", registerHandler);
router.post("/updateInfo1", updateFormInfo1);
router.post("/updateInfo2", updateFormInfo2);

module.exports = router;
