const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/events");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, eventsController.getEvent);

router.post("/createEvent",  eventsController.createEvent);

// router.put("/likePost/:id", postsController.likePost);

router.delete("/deleteEvent/:id", eventsController.deleteEvent);

module.exports = router;
