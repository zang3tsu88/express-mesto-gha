const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // default: [],
      // вроде массив и так по умолчанию пустой, так что это поле не надо.
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Card", cardSchema);
/**
 *
 * Вопрос. Как лучше писать, с маленькой или большой?
 *
 * Судя по документации и другим ресурсам, модели писать с большой буквы
 * Монгус фоном делает 2 вещи: добавляет "s"(множественное число),
 * И из заглавной преобразует в маленькую букву.
 * https://samwize.com/2014/03/07/what-mongoose-never-explain-to-you-on-case-sentivity/
 *
 *  */
