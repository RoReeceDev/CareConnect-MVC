const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/events");
const NHController = require("../controllers/nursinghome");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, NHController.getNH);

// router.post("/createEvent",  eventsController.createEvent);

router.put("/joinEvent/:id", NHController.joinEvent);
router.put("/unjoinEvent/:id", NHController.unjoinEvent);


// router.delete("/deleteEvent/:id", eventsController.deleteEvent);

module.exports = router;