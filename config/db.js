const Sequelize = require("sequelize");

const sequelize = new Sequelize("asmphattriencanhan", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
