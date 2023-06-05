const router = require("express").Router();
const usersController = require("../controllers/users");
const cardsController = require("../controllers/cards");

router.get("/users", usersController.getUsers);
router.get("/users/:userId", usersController.getUserById);
router.post("/users", usersController.createUser);
router.patch("/users/me", usersController.updateProfile);
router.patch("/users/me/avatar", usersController.updateAvatar);

router.get("/cards", cardsController.getCards);
router.post("/cards", cardsController.createCard);
router.delete("/cards/:cardId", cardsController.deleteCardById);
router.put("/cards/:cardId/likes", cardsController.likeCard);
router.delete("/cards/:cardId/likes", cardsController.unlikeCard);

module.exports = router;

// Test User ObjId
// 647a3fd1d9577763a78fa33c
