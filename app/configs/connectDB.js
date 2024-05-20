const Sequelize = require('sequelize');

const sequelize = new Sequelize('lab5', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
