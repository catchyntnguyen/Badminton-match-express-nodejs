// app.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./configs/connectDB');
const indexRouter = require('./routes/web');
const configViewEngine = require('./configs/viewEngine');

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

configViewEngine(app);

app.use('/', indexRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
