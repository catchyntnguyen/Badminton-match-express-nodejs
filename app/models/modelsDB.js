const sequelize = require('../configs/connectDB.js');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');
const Matches = sequelize.define('matches_details', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  categoriesID: {
    type: Sequelize.INTEGER,
    allowNull: false, // Đảm bảo idCategory không thể là null
    references: {
      model: 'categories', // Tên bảng mà khóa phụ tham chiếu đến
      key: 'id', // Tên cột trong bảng categories
    },
    onUpdate: 'CASCADE', // Tùy chọn để cập nhật các bản ghi con khi bản ghi cha thay đổi
    onDelete: 'CASCADE', // Tùy chọn để xóa các bản ghi con khi bản ghi cha bị xóa
  },
  scoreT1: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  dateStart: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  dateEnd:{
    type: Sequelize.DATE,
    allowNull: false,
  },
  player: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  coreT2:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  Time:{
    type: Sequelize.DATE,
    allowNull: false,
  },
  location:{
    type: Sequelize.STRING,
    allowNull: false,
  },
});
const Categories = sequelize.define('Categories', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = {
  Matches,
  Categories,
};
