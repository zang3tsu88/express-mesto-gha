const User = require("../models/User");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Internal Server Error.",
        err: err.message,
        stack: err.stack,
      });
    });
};
const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((users) => {
      if (!users) {
        return res.status(404).send({
          message: "User with such id not found.",
        });
      }
      return res.send(users);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({
          message: "Entered invalid data.",
          err: err.message,
          stack: err.stack,
        });
      }
      return res.status(500).send({
        message: "Internal Server Error.",
        err: err.message,
        stack: err.stack,
      });
    });
};
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Entered invalid data.",
          err: err.message,
          stack: err.stack,
        });
      }
      return res.status(500).send({
        message: "Internal Server Error.",
        err: err.message,
        stack: err.stack,
      });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
    // нужны ли все, или достаточно new: true... ???
    // , upsert: true
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User with such id not found.",
        });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Entered invalid data.",
          err: err.message,
          stack: err.stack,
        });
      }
      return res.status(500).send({
        message: "Internal Server Error.",
        err: err.message,
        stack: err.stack,
      });
    });
};
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true, upsert: true }
    // нужны ли все, или достаточно new: true... ???
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User with such id not found.",
        });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Entered invalid data.",
          err: err.message,
          stack: err.stack,
        });
      }
      return res.status(500).send({
        message: "Internal Server Error.",
        err: err.message,
        stack: err.stack,
      });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
