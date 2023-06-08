// const STATUS_CODE_MESSAGE = require("http").STATUS_CODES;
const http2 = require('http2').constants;
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Вы написали "Текст необязательно связывать именно с кодом. ",
 * Я не очень понял, о чем вы. Можно точнее?
 */
mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log('Server Connection Error!!!\n', err));

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '647a3fd1d9577763a78fa33c',
  };

  next();
});
app.use(router);
app.use('*', (req, res) => {
  res.status(http2.HTTP_STATUS_NOT_FOUND).send({ message: 'Page not Found' });
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
