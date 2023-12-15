const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/events");
const calEventsController = require("../controllers/calendarevent");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, eventsController.getEvent);

router.post("/createEvent", ensureAuth,  eventsController.createEvent);

router.get('/api/events', ensureAuth, calEventsController.getEvents)

router.put("/editevent/:id", ensureAuth, eventsController.editEvent);

router.delete("/deleteEvent/:id", ensureAuth, eventsController.deleteEvent);

module.exports = router;
