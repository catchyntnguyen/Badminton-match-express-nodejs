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
  const matches = await sequelize.query("SELECT * FROM matches_detail ORDER BY id DESC", {
    type: QueryTypes.SELECT,
  });
  res.render("home", { matches: matches, currentUrl: '/' });
};
const filterMissing = async (req, res) => {
  const matches = await sequelize.query("SELECT * FROM matches_detail WHERE status = 1", {
    type: QueryTypes.SELECT,
  });
  res.render("home", { matches: matches, currentUrl: '/' });
};
const filterDone = async (req, res) => {
  const matches = await sequelize.query("SELECT * FROM matches_detail WHERE status = 2", {
    type: QueryTypes.SELECT,
  });
  res.render("home", { matches: matches, currentUrl: '/' });
};
const filterDay = async (req, res) => {
  try {
    const filterDate = req.query.filterDate;
    if (!filterDate) {
      return res.status(400).send('filterDate query parameter is required');
    }

    // console.log(`Filter date received: ${filterDate}`);

    const matches = await sequelize.query(
      "SELECT * FROM matches_detail WHERE dateStart = :filterDate",
      {
        type: QueryTypes.SELECT,
        replacements: { filterDate },
      }
    );

    res.render('home', { matches: matches, currentUrl: '/' });
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).send('Internal Server Error');
  }
};
const filterHistoryDay = async (req, res) => {
  try {
    let yourMatch = [];
    const user = JSON.parse(localStorage.getItem("user"));
    const userID = Number(user[0])
    const filterDate = req.query.filterDate;
    if (!filterDate) {
      return res.status(400).send('filterDate query parameter is required');
    }

    // console.log(`Filter date received: ${filterDate}`);

    const matches = await sequelize.query(
      "SELECT * FROM matches_detail WHERE status = 3 AND dateStart = :filterDate",
      {
        type: QueryTypes.SELECT,
        replacements: { filterDate },
      }
    );
    matches.forEach(match => {
      const playerData = JSON.parse(match.player);
      const userExists = playerData.user.includes(userID);
      if(userExists) {
        yourMatch.push(match);
      }
    });
    res.render('history', { matches: yourMatch, currentUrl: '/history'});
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).send('Internal Server Error');
  }
};
const filterMatchSingle = async (req, res) => {
  const matches = await sequelize.query("SELECT * FROM matches_detail WHERE categoriesID = 1", {
    type: QueryTypes.SELECT,
  });
  res.render("home", { matches: matches, currentUrl: '/' });
};
const historyFilterMatchSingle = async (req, res) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userID = Number(user[0])
    const matches = await sequelize.query(
      `SELECT * FROM matches_detail WHERE JSON_CONTAINS(player, ?, '$.user') AND status = 3 AND categoriesID = 1`,
      {
        replacements: [`[${userID}]`],
        type: QueryTypes.SELECT
      }
    );
    // const matchDetails = await sequelize.query('SELECT * FROM matches_detail WHERE id = ?', {
    //   replacements: [matchId],
    //   type: QueryTypes.SELECT
    // });
    res.render('history', { currentUrl: '/history', matches });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
};
const historyFilterMatchCouple = async (req, res) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userID = Number(user[0])
    const matches = await sequelize.query(
      `SELECT * FROM matches_detail WHERE JSON_CONTAINS(player, ?, '$.user') AND status = 3 AND categoriesID = 2`,
      {
        replacements: [`[${userID}]`],
        type: QueryTypes.SELECT
      }
    );
    // const matchDetails = await sequelize.query('SELECT * FROM matches_detail WHERE id = ?', {
    //   replacements: [matchId],
    //   type: QueryTypes.SELECT
    // });
    res.render('history', { currentUrl: '/history', matches });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
};
const filterMatchCouple = async (req, res) => {
  const matches = await sequelize.query("SELECT * FROM matches_detail WHERE categoriesID = 2", {
    type: QueryTypes.SELECT,
  });
  res.render("home", { matches: matches, currentUrl: '/' });
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
  }
  else {
    if (password === user.password) {
      if (user.role == 1) {
        const userData = Object.values(user);
        localStorage.setItem("user", JSON.stringify(userData));
        res.redirect("/");
      }
      else {
        const userData = Object.values(user);
        localStorage.setItem("user", JSON.stringify(userData));
        res.redirect("/");
      }
    }
    else {
      error = "Mật khẩu không đúng bạn ơi!!!"
    }
  }
};

const registerHandler = async (req, res) => {
  try {
    let { nameAccountRegister, emailAccountRegister, passwordAccountRegister } = req.body;
    await sequelize.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      { replacements: [nameAccountRegister, emailAccountRegister, passwordAccountRegister, 0] }
    );
    return res.redirect("/login");
  } catch (error) {
    console.error(error);
    return res.status(500).send('Lỗi máy chủ');
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
  res.render("match_detail", { matches: matches, detail, users, userAll, currentUrl: '/' });
};
const joinTeam = async (req, res) => {
  try {
    const userAll = await sequelize.query('SELECT * FROM users', {
      type: QueryTypes.SELECT
    });
    const matches = await sequelize.query('SELECT * FROM matches_detail', {
      type: QueryTypes.SELECT
    });

    let id = Number(req.params.id);
    let team = Number(req.params.team);

    let userDetail = getid(userAll, id);
    if (!userDetail) {
      return res.status(404).send('User not found');
    }

    let teamDetail = getid(matches, team);
    if (!teamDetail) {
      return res.status(404).send('Match team not found');
    }

    let playerNew = JSON.parse(teamDetail.player);
    let check = playerNew.user.some((u) => {
      return Number(u) === Number(id);
    });

    if (!check) {
      playerNew.user.push(id);
      teamDetail.player = JSON.stringify(playerNew);
      await sequelize.query(
        'UPDATE matches_detail SET player = :player WHERE id = :teamId',
        {
          replacements: { player: teamDetail.player, teamId: team },
          type: QueryTypes.UPDATE
        }
      );

      await sequelize.query(
        'UPDATE matches_detail SET status = :status WHERE id = :teamId',
        {
          replacements: { status: '2', teamId: team },
          type: QueryTypes.UPDATE
        }
      );

      return res.redirect("/");
    } else {
      let error = encodeURIComponent("Bạn-đã-có-trong-trận-đấu");
      return res.redirect(`/?Thông_báo=${error}`);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Lỗi máy chủ');
  }
};

const historyPage = async (req, res) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userID = Number(user[0])
    const matches = await sequelize.query(
      `SELECT * FROM matches_detail WHERE JSON_CONTAINS(player, '[${userID}]', '$.user') AND status = 3 ORDER BY id DESC`,
      {
        type: QueryTypes.SELECT
      }
    );
    // const matchDetails = await sequelize.query('SELECT * FROM matches_detail WHERE id = ?', {
    //   replacements: [matchId],
    //   type: QueryTypes.SELECT
    // });
    res.render('history', { currentUrl: '/history', matches });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
}

const historyDetail = async (req, res) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userID = Number(user[0])
    const matches = await sequelize.query(
      `SELECT * FROM matches_detail WHERE JSON_CONTAINS(player, '[${userID}]', '$.user') AND status = 3`,
      {
        type: QueryTypes.SELECT
      }
    );
    const userAll = await sequelize.query("SELECT * FROM users", {
      type: QueryTypes.SELECT,
    });
    let id = Number(req.params.id);
    let detail = getid(matches, id);
    let players = JSON.parse(detail.player);
    let users = players.user;
    res.render("history_detail", { matches: matches, detail, users, userAll, currentUrl: '/history' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Đã xảy ra lỗi' });
  }
};

const createMatch = async (req, res) => {
  try {
    const showMatch = await sequelize.query('SELECT * FROM matches_detail WHERE status = 2 ORDER BY id DESC', {
      type: QueryTypes.SELECT
    });
    const matches = await sequelize.query("SELECT * FROM matches_detail ORDER BY id DESC", {
      type: QueryTypes.SELECT,
    });
    const user = JSON.parse(localStorage.getItem("user"));
    const userID = user[0];
    matches.forEach(match => {
      // Parse the player field if it's stored as a JSON string
      const playerData = JSON.parse(match.player);
      const userExists = playerData.user.includes(userID);
      // console.log(`Match ID: ${match.id}, User exists: ${userExists}`);
    });
    res.render('createMatch', { currentUrl: '/createMatch', showMatch });
  } catch (error) {
    console.log(error);
  }
};

const yourMatch = async (req, res) => {
  try {
    let yourMatch = [];

    const matches = await sequelize.query("SELECT * FROM matches_detail", {
      type: QueryTypes.SELECT,
    });

    const user = JSON.parse(localStorage.getItem("user"));
    const userID = Number(user[0])

    matches.forEach(match => {
      const playerData = JSON.parse(match.player);
      const userExists = playerData.user.includes(userID);
      // console.log(`Match ID: ${match.id}, User exists: ${userExists}`);
      if(userExists) {
        yourMatch.push(match);
      }
    });
    // Trả về kết quả
    res.render('createMatch', { currentUrl: '/createMatch', showMatch: yourMatch });
  } catch (error) {
    console.log(error);
    res.status(500).send('Đã xảy ra lỗi khi tải các trận đấu của bạn');
  }
};

const postcreateMatch = async (req, res) => {
  try {
    const { matchType, matchDate, matchTime, matchLocation } = req.body;
    const user = JSON.parse(localStorage.getItem("user"));
    const userID = user[0]
    const playerArray = [userID];
    const playerJSON = JSON.stringify({ user: playerArray });

    const query = `
      INSERT INTO matches_detail (categoriesID, scoreT1, status, dateStart, dateEnd, player, coreT2, time, location)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await sequelize.query(query, {
      replacements: [matchType, 0, 1, matchDate, "", playerJSON, 0, matchTime, matchLocation],
      type: QueryTypes.INSERT
    });
    res.redirect('createMatch');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error creating match');
  }
};
const editMatch = async (req, res) => {
  try {
    const matchId = Number(req.params.id);
    if (isNaN(matchId)) {
      return res.status(400).send('ID trận đấu không hợp lệ');
    }

    // Lấy tất cả các trận đấu
    const showMatch = await sequelize.query('SELECT * FROM matches_detail', {
      type: QueryTypes.SELECT
    });

    // Lấy chi tiết trận đấu với ID cụ thể
    const matchDetails = await sequelize.query('SELECT * FROM matches_detail WHERE id = ?', {
      replacements: [matchId],
      type: QueryTypes.SELECT
    });

    // Cập nhật trạng thái trận đấu
    await sequelize.query(
      'UPDATE matches_detail SET status = :status WHERE id = :matchId',
      {
        replacements: { status: '3', matchId: matchId },
        type: QueryTypes.UPDATE
      }
    );

    if (matchDetails.length > 0) {
      res.render('edit_match', { currentUrl: '/createMatch', showMatch, matchDetails: matchDetails[0] });
    } else {
      res.status(404).send('Trận đấu không tồn tại');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Đã xảy ra lỗi khi tải trang chỉnh sửa trận đấu');
  }
};


const PosteditMatch = async (req, res) => {
  try {
    const matchId = Number(req.params.id);
    const { scoreT1, scoreT2, time, location } = req.body;
    await sequelize.query(
      'UPDATE matches_detail SET scoreT1 = ?, coreT2 = ?, time = ?, location = ? WHERE id = ?',
      {
        replacements: [scoreT1, scoreT2, time, location, matchId],
        type: QueryTypes.UPDATE
      }
    );
    res.redirect('/createMatch');
  } catch (error) {
    console.error(error);
    res.status(500).send('Đã xảy ra lỗi khi cập nhật trận đấu');
  }
};

const infomation = async (req, res) => {
  res.render("information", { currentUrl: "/info" });
};


module.exports = {
  homePage,
  login,
  logOut,
  matchTeam,
  joinTeam,
  historyPage,
  createMatch,
  postcreateMatch,
  historyDetail,
  loginHandler,
  registerHandler,
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
  infomation
};
