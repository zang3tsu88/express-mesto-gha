const Card = require("../models/Card");

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Internal Server Error.",
        err: err.message,
        stack: err.stack,
      });
    });
};

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send(card);
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

// if (!card) thorw Error - если карточки нет
// или orfail
const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({
          message: "No card with such id.",
        });
      }
      return res.send(card);
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

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({
          message: "No card with such id.",
        });
      }
      return res.send(card);
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
const unlikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "No card with such id." });
      }
      return res.send(card);
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

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  unlikeCard,
};
