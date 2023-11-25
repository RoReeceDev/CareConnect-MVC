const express = require("express");
const router = express.Router();
const manageProfileController = require("../controllers/createprofile");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes
router.get("/create", ensureAuth, manageProfileController.getCreateProfile);
router.put("/create/:id", manageProfileController.updateProfile);
router.put("/edit/:id", manageProfileController.editProfile);




module.exports = router;