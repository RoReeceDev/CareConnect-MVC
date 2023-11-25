const Event = require("../models/Event");

module.exports = {
    getEvents: async (req, res) => {
        try {
          // Fetch events from the database
          let events = []
      if(req.user.role.isVolunteer === false){
       events = await Event.find({ user: req.user.id }).sort({createdAt: "desc"});
      }else{
       events = await Event.find({ volunteers: req.user.id }).sort({eventDate: "ascending"});
      }
        //   const events = await Event.find().sort({ eventDate: "ascending" });
    
          // Send events as JSON
          res.json(events);
        } catch (err) {
          console.log(err);
          res.status(500).json({ error: "Internal Server Error" });
        }
      },
}