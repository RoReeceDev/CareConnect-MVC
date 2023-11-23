const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const eventsController = require("../controllers/events");
const createProfileController = require("../controllers/createprofile");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, eventsController.getProfile);
router.get("/createprofile", ensureAuth, createProfileController.getCreateProfile);
router.put("/createprofile/:id", createProfileController.updateProfile);
router.get("/board", ensureAuth, postsController.getBoard);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.delete("/delete-account/:id", authController.deleteAccount);


module.exports = router;
