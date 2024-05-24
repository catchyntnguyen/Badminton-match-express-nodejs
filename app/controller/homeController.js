//khai báo modules
const sequelize = require('../configs/connectDB');
const { Sequelize, QueryTypes } = require('sequelize');

//hàm tìm id sẵn
const getid = (data, id) => {
    return data.find((i) => i.id === id);
}
// Hàm xử lý trang chủ
let error = null;
const homePage = async (req, res) => {
    const matches = await sequelize.query('SELECT * FROM matches_detail', {
        type: QueryTypes.SELECT
    });
    res.render('home', { matches: matches});
};
const matchTeam = async (req, res) => {
    const matches = await sequelize.query('SELECT * FROM matches_detail', {
        type: QueryTypes.SELECT
    });
    const userAll = await sequelize.query('SELECT * FROM users', {
        type: QueryTypes.SELECT
    });
    let id = Number(req.params.id);
    let detail = getid(matches, id);
    let players = JSON.parse(detail.player);
    let users = players.user
    res.render('match_detail', { matches: matches, detail, users, userAll });
}
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

            // await sequelize.query(
            //     'UPDATE matches_detail SET player = :player WHERE id = :teamId',
            //     {
            //         replacements: { player: teamDetail.player, teamId: team },
            //         type: QueryTypes.UPDATE
            //     }
            // );

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

module.exports = {
    homePage,
    matchTeam,
    joinTeam
};