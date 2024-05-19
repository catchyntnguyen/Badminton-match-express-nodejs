// routes/index.js

const express = require('express');
const router = express.Router();
const {Product, Categories} = require('../models/modelsDB');
// Trang chủ - Hiển thị danh sách người dùng
router.get('/', async (req, res) => {
    try {
        // Lấy danh sách người dùng từ CSDL
        const products = await Product.findAll();

        // Render template EJS và truyền danh sách người dùng vào
        res.render('detail', {products });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
});

router.get('/detail/:id', async (req, res) => {
    try {
        // Lấy danh sách người dùng từ CSDL
        let id = req.params.id;
        const detail = await Product.findOne({ where: { id: id } });
        // Render template EJS và truyền danh sách người dùng vào
        res.render('detail', { detail });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
});


module.exports = router;
