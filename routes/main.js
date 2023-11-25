const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const eventsController = require("../controllers/events");
const profileController = require("../controllers/profile");
const manageProfileController = require("../controllers/createprofile");

const boardController = require("../controllers/board");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, profileController.getProfile);
router.get("/myevents", ensureAuth, eventsController.getMyEvents);
router.get("/createprofile", ensureAuth, manageProfileController.getCreateProfile);
router.put("/createprofile/:id", manageProfileController.updateProfile);
router.get("/board", ensureAuth, boardController.getBoard);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.delete("/delete-account/:id", authController.deleteAccount);


module.exports = router;
