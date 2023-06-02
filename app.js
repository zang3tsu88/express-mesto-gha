const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017/mestodb");

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
