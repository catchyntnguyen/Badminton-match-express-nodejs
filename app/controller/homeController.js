//khai báo modules
const sequelize = require('../configs/connectDB');
const { Sequelize, QueryTypes } = require('sequelize');

//hàm tìm id sẵn
const getid = (data, id) => {
    return data.find((i) => i.id === id);
}
// Hàm xử lý trang chủ
const homePage = async (req, res) => {
    const matches = await sequelize.query('SELECT * FROM matches_detail', {
        type: QueryTypes.SELECT
    });
    res.render('home', { matches: matches });
};
const matchTeam = async (req, res) => {
    const matches = await sequelize.query('SELECT * FROM matches_detail', {
        type: QueryTypes.SELECT
    });
    const userAll = await sequelize.query('SELECT * FROM users', {
        type: QueryTypes.SELECT
    });
    let id =  Number(req.params.id);
    let detail = getid(matches,id);
    let players = JSON.parse(detail.player);
    let users = players.user
    res.render('match_detail', { matches: matches, detail, users, userAll});
}
module.exports = {
    homePage,
    matchTeam
};