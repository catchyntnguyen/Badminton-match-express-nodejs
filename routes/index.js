// routes/index.js

const express = require("express");
const router = express.Router();
const { Product, Categories } = require("../models/modelsDB");

// Trang chủ - Hiển thị danh sách người dùng
router.get("/", async (req, res) => {
  try {
    // Lấy danh sách người dùng từ CSDL
    // const products = await Product.findAll({ where: { idCategory: 1 } });
    // const popular = await Product.findAll({ where: { favorite: 1 } });
    // const products2 = await Product.findAll({ where: { idCategory: 2 } });

    // Render template EJS và truyền danh sách người dùng vào
    res.render("home");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
});

module.exports = router;
