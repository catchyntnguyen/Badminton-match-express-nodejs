'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
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
        type: Sequelize.STRING,
        allowNull: false,
      },
      favorite:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Thêm ràng buộc khóa phụ
    await queryInterface.addConstraint('products', {
      fields: ['idCategory'],
      type: 'foreign key',
      name: 'FK_products_category_id', // Tên của ràng buộc khóa phụ
      references: {
        table: 'categories', // Tên bảng mà khóa phụ tham chiếu đến
        field: 'id', // Tên cột trong bảng categories
      },
      onDelete: 'CASCADE', // Tùy chọn để xóa các bản ghi con khi bản ghi cha bị xóa
      onUpdate: 'CASCADE', // Tùy chọn để cập nhật các bản ghi con khi bản ghi cha thay đổi
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
