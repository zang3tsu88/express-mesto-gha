const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes/routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log('Server Connection Error!!!\n', err));

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use(router);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
