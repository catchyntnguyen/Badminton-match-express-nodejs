const sequelize = require('../config/db');

const { Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');
const Product = sequelize.define('Product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idCategory: {
    type: Sequelize.INTEGER,
    allowNull: false, // Đảm bảo idCategory không thể là null
    references: {
      model: 'categories', // Tên bảng mà khóa phụ tham chiếu đến
      key: 'id', // Tên cột trong bảng categories
    },
    onUpdate: 'CASCADE', // Tùy chọn để cập nhật các bản ghi con khi bản ghi cha thay đổi
    onDelete: 'CASCADE', // Tùy chọn để xóa các bản ghi con khi bản ghi cha bị xóa
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  img: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  views: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  favorite:{
    type: Sequelize.BOOLEAN,
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
  Product,
  Categories,
};
