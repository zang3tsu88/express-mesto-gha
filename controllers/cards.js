const http2 = require("http2").constants;
const Card = require("../models/Card");
// 500 Internal Server Error
// 404 Not Found
// 400 Bad Request
// 201 Created
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      res.status(http2.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
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
      res.status(http2.HTTP_STATUS_CREATED).send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(http2.HTTP_STATUS_BAD_REQUEST).send({
          message: "Entered invalid data.",
          err: err.message,
          stack: err.stack,
        });
      }
      return res.status(http2.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        message: "Internal Server Error.",
        err: err.message,
        stack: err.stack,
      });
    });
};

// if (!card) thorw Error - если карточки нет
// или orfail

// .orFail(
//   () => new Error(`Пользователь с таким _id ${req.params.userId} не найден`)
//   //надо получить эту строку
//   )

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(http2.HTTP_STATUS_NOT_FOUND).send({
          message: "No card with such id.",
        });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(http2.HTTP_STATUS_BAD_REQUEST).send({
          message: "Entered invalid data.",
          err: err.message,
          stack: err.stack,
        });
      }
      return res.status(http2.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
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
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(http2.HTTP_STATUS_NOT_FOUND).send({
          message: "No card with such id.",
        });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(http2.HTTP_STATUS_BAD_REQUEST).send({
          message: "Entered invalid data.",
          err: err.message,
          stack: err.stack,
        });
      }
      return res.status(http2.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
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
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res
          .status(http2.HTTP_STATUS_NOT_FOUND)
          .send({ message: "No card with such id." });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(http2.HTTP_STATUS_BAD_REQUEST).send({
          message: "Entered invalid data.",
          err: err.message,
          stack: err.stack,
        });
      }
      return res.status(http2.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
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
