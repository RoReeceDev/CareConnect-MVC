const express = require("express");
const router = express.Router();
const manageProfileController = require("../controllers/createprofile");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes
router.get("/create", ensureAuth, manageProfileController.getCreateProfile);
router.put("/create/:id", ensureAuth, manageProfileController.updateProfile);
router.put("/edit/:id", ensureAuth, manageProfileController.editProfile);




module.exports = router;