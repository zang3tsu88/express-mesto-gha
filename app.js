const http = require("http");
const http2 = require("http2");
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 3000;

// console.log(http);
// console.log(http2);
// console.log(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR);
// console.log(http.STATUS_CODES[500]);

mongoose
  .connect("mongodb://127.0.0.1:27017/mestodb")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Server Connection Error!!!\n", err));

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "647a3fd1d9577763a78fa33c",
    // Не пойму зачем в вебинаре айдишник созраняли так:
    // new mongoose.ObjectId()
    // я проверил, в базу данных он все равно попадает как ObjectId()
  };

  next();
});
app.use(router);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

// res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
//   // message: "Internal Server Error.",
//   message: http.STATUS_CODES[500],
//   err: err.message,
//   stack: err.stack,
// });
