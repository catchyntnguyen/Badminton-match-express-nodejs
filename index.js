// app.js

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const indexRouter = require('./routes/index');
const productRouter = require('./routes/products');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Kết nối CSDL
sequelize
  .authenticate()
  .then(() => {
    console.log('Kết nối CSDL thành công.');
  })
  .catch(err => {
    console.error('Không thể kết nối CSDL:', err);
  });

app.set('view engine', 'ejs'); 
app.use(express.static('public')); 

app.use('/', indexRouter);
app.use('/addMath', productRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
  console.log(`http://localhost:${PORT}/users`);
  console.log(`http://localhost:${PORT}/catalogs`);
});
