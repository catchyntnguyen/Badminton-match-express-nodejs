const Sequelize = require('sequelize');

const sequelize = new Sequelize('bmibatminton', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
