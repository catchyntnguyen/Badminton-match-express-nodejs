//khai báo modules
const connectDB = require('../configs/connectDB');

// Trang controllers
const homePage = async (req, res)=> {
    
    res.render('home');
}

module.exports = {
    homePage
  };