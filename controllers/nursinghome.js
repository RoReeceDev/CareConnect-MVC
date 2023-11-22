
const User = require("../models/User");
const Event = require("../models/Event");


module.exports = {
  getNH: async (req, res) => {
    try {
        console.log(req.params.id)
      const events = await Event.find({ user: req.params.id });
      
      console.log(events)
      res.render("nursinghome.ejs", { events: events, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  joinEvent: async (req, res) =>{
    try {
      //Check if numNeeded for volunteers is more than 0
      const events = await Event.find({ _id: req.params.id });
     if(events[0].numNeeded > 0){
     const result = await Event.findOneAndUpdate(
        { _id: req.params.id },
        {
          //push volunteer ID to event volunteer arr
          $inc: { numNeeded: -1 },
           //push volunteer ID to event volunteer arr
          $push: { volunteers: req.user.id}
        }

      ).lean();
     }
      console.log("volunteer -1");
      res.redirect(`/nh/${events[0].user}`);
    } catch (err) {
      console.log(err);
    }
  }
};