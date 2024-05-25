//khai báo modules
const sequelize = require("../configs/connectDB");
const { Sequelize, QueryTypes } = require("sequelize");
//hàm tìm id sẵn
const getid = (data, id) => {
  return data.find((i) => i.id === id);
};
// Hàm xử lý trang chủ
let error = null;
const homePage = async (req, res) => {
  const matches = await sequelize.query("SELECT * FROM matches_detail", {
    type: QueryTypes.SELECT,
  });
  res.render("home", { matches: matches, currentUrl: "/" });
};
const login = async (req, res) => {
  const userAll = await sequelize.query("SELECT * FROM users", {
    type: QueryTypes.SELECT,
  });
  res.render("account");
};

const logOut = (req, res) => {
  localStorage.clear();
  res.redirect("/?error=" + encodeURIComponent(error));
};
const loginHandler = async (req, res) => {
  const userAll = await sequelize.query("SELECT * FROM users", {
    type: QueryTypes.SELECT,
  });
  const email = req.body.emailLogin;
  const password = req.body.passwordLogin;
  const user = userAll.find((user) => user.email === email);
  if (!user) {
    error = "Email không tồn tại!!!";
  } else {
    if (password === user.password) {
      if (user.role == 1) {
        const userData = Object.values(user);
        localStorage.setItem("user", JSON.stringify(userData));
        res.redirect("/");
      } else {
        const userData = Object.values(user);
        localStorage.setItem("user", JSON.stringify(userData));
        res.redirect("/");
      }
    } else {
      error = "Mật khẩu không đúng bạn ơi!!!";
    }
  }
};

const registerHandler = async (req, res) => {
  try {
    let { nameAccountRegister, emailAccountRegister, passwordAccountRegister } =
      req.body;
    await sequelize.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      {
        replacements: [
          nameAccountRegister,
          emailAccountRegister,
          passwordAccountRegister,
          0,
        ],
      }
    );
    return res.redirect("/login");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Lỗi máy chủ");
  }
};

const matchTeam = async (req, res) => {
  const matches = await sequelize.query("SELECT * FROM matches_detail", {
    type: QueryTypes.SELECT,
  });
  const userAll = await sequelize.query("SELECT * FROM users", {
    type: QueryTypes.SELECT,
  });
  let id = Number(req.params.id);
  let detail = getid(matches, id);
  let players = JSON.parse(detail.player);
  let users = players.user;
  res.render("match_detail", {
    matches: matches,
    detail,
    users,
    userAll,
    currentUrl: "/matches",
  });
};
const joinTeam = async (req, res) => {
  try {
    const userAll = await sequelize.query("SELECT * FROM users", {
      type: QueryTypes.SELECT,
    });
    const matches = await sequelize.query("SELECT * FROM matches_detail", {
      type: QueryTypes.SELECT,
    });

    let id = Number(req.params.id);
    let team = Number(req.params.team);

    let userDetail = getid(userAll, id);
    if (!userDetail) {
      return res.status(404).send("User not found");
    }

    let teamDetail = getid(matches, team);
    if (!teamDetail) {
      return res.status(404).send("Match team not found");
    }

    let playerNew = JSON.parse(teamDetail.player);
    let check = playerNew.user.some((u) => {
      return Number(u) === Number(id);
    });

    if (!check) {
      playerNew.user.push(id);
      teamDetail.player = JSON.stringify(playerNew);
      await sequelize.query(
        "UPDATE matches_detail SET player = :player WHERE id = :teamId",
        {
          replacements: { player: teamDetail.player, teamId: team },
          type: QueryTypes.UPDATE,
        }
      );

      await sequelize.query(
        "UPDATE matches_detail SET status = :status WHERE id = :teamId",
        {
          replacements: { status: "2", teamId: team },
          type: QueryTypes.UPDATE,
        }
      );

      return res.redirect("/");
    } else {
      let error = encodeURIComponent("Bạn-đã-có-trong-trận-đấu");
      return res.redirect(`/?Thông_báo=${error}`);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Lỗi máy chủ");
  }
};
const infomation = async (req, res) => {
  res.render("information" , {currentUrl: "/info"});
};

const historyPage = async (req, res) => {
  try {
    const userId = 1;
    const matches = await sequelize.query(
      `SELECT * FROM matches_detail WHERE JSON_CONTAINS(player, '[${userId}]', '$.user') AND status = 3`,
      {
        type: QueryTypes.SELECT,
      }
    );
    const matchId = Number(req.params.id);
    // const matchDetails = await sequelize.query('SELECT * FROM matches_detail WHERE id = ?', {
    //   replacements: [matchId],
    //   type: QueryTypes.SELECT
    // });
    const matchesbyID = await sequelize.query("SELECT * FROM matches_detail", {
      type: QueryTypes.SELECT,
    });
    console.log(matchId);
    const detail = getid(matchesbyID, matchId);
    res.render("history", { currentUrl: "/history", matches, detail });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

const historyDetail = async (req, res) => {
  try {
    const matchId = Number(req.params.id);
    const matchDetails = await sequelize.query(
      "SELECT * FROM matches_detail WHERE id = ?",
      {
        replacements: [matchId],
        type: QueryTypes.SELECT,
      }
    );
    res.render("history", { currentUrl: "/history", matchDetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};

const createMatch = async (req, res) => {
  try {
    const showMatch = await sequelize.query("SELECT * FROM matches_detail", {
      type: QueryTypes.SELECT,
    });

    console.log(showMatch);
    res.render("createMatch", { currentUrl: "/createMatch", showMatch });
  } catch (error) {
    console.log(error);
  }
};
const postcreateMatch = async (req, res) => {
  try {
    const { matchType, matchDate, matchTime, matchLocation } = req.body;
    const user = 1;
    const playerArray = [user];
    const playerJSON = JSON.stringify({ user: playerArray });

    const query = `
      INSERT INTO matches_detail (categoriesID, scoreT1, status, dateStart, dateEnd, player, coreT2, time, location)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await sequelize.query(query, {
      replacements: [
        matchType,
        0,
        1,
        matchDate,
        "",
        playerJSON,
        0,
        matchTime,
        matchLocation,
      ],
      type: QueryTypes.INSERT,
    });
    res.redirect("createMatch");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating match");
  }
};

module.exports = {
  homePage,
  login,
  logOut,
  matchTeam,
  infomation,
  joinTeam,
  historyPage,
  createMatch,
  postcreateMatch,
  historyDetail,
  loginHandler,
  registerHandler,
};
