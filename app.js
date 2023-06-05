// const STATUS_CODE_MESSAGE = require("http").STATUS_CODES;
// const http2 = require("http2").constants;
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Я видел рекомендации использовать статус коды из http2,
 * но я не очень пойму насколько это целесообразно(по крайней мере в этом
 * проекте) Ниже пример реализации. Не слишком ли ради пары строк.
 *
// res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
//   // message: "Internal Server Error.",
//   message: http.STATUS_CODES[500],
//   err: err.message,
//   stack: err.stack,
// });

Можно например так наверное.. но тоже не понятно насколько это целесообразно
console.log(STATUS_CODE_MESSAGE[400]);  // Bad Request
console.log(http2.HTTP_STATUS_BAD_REQUEST);  // 400
 */
mongoose
  .connect("mongodb://127.0.0.1:27017/mestodb")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Server Connection Error!!!\n", err));

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "647a3fd1d9577763a78fa33c",
  };

  next();
});
app.use(router);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
