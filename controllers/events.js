const mongoose = require("mongoose");
const Event = require("../models/Event");
const User = require("../models/User");

const { ObjectID } = require("mongodb");

module.exports = {
  getMyEvents: async (req, res) => {
    try {
      let events = []
      if(req.user.role.isVolunteer === false){
       events = await Event.find({ user: req.user.id }).sort({createdAt: "desc"});
      }else{
       events = await Event.find({ volunteers: req.user.id }).sort({eventDate: "ascending"});
      }
      res.render("myevents.ejs", { events: events, user: req.user, pageName: 'myevents' });
    } catch (err) {
      console.log(err);
    }
  },
  getEvent: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      const volunteers = await User.find({ '_id': { $in: event.volunteers.map(id => mongoose.Types.ObjectId(id)) } })
      res.render("event.ejs", { event: event, user: req.user, pageName: 'event',volunteers: volunteers});
    } catch (err) {
      console.log(err);
    }
  },
  createEvent: async (req, res) => {
    try {

      const userEvents = await Event.find({
        user: req.user._id,
        eventDate: req.body.eventDate,
        $or: [
          {
            $and: [
              { startTime: { $lte: req.body.sTime } },
              { endTime: { $gte: req.body.sTime } },
            ],
          },
          {
            $and: [
              { startTime: { $lte: req.body.eTime } },
              { endTime: { $gte: req.body.eTime } },
            ],
          },
          {
            $and: [
              { startTime: { $gte: req.body.sTime } },
              { endTime: { $lte: req.body.eTime } },
            ],
          },
        ],
      });
  
      if (userEvents.length > 0) {
        console.log("Cannot create event. Conflicting events exist.");
        msg = 'Cannot create event. Conflicting events exist.'

        req.session.sessionFlash = {
          type: 'msg',
          message: msg
      }
        return  req.session.save(() => res.redirect("/myevents"));

      }


      await Event.create({
        name: req.body.eventName,
        eventDate: req.body.eventDate,
        startTime: req.body.sTime,
        endTime: req.body.eTime,
        numNeeded: req.body.numNeeded,
        user: req.user.id,
      });
      console.log("Event has been added!");
      res.redirect("/myevents");
    } catch (err) {
      console.log(err);
    }
  },
  deleteEvent: async (req, res) => {
    try {
      // Find post by id
      let event = await Event.findById({ _id: req.params.id });

      // Delete post from db
      await Event.remove({ _id: req.params.id });
      console.log("Deleted Event");
      res.redirect("/myevents");
    } catch (err) {
      res.redirect("/myevents");
    }
  },
  editEvent: async (req, res) => {
    try {
            await Event.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $set: {
                        'name': req.body.editEventName,
                        'eventDate': req.body.editDateOfEvent,
                        'startTime': req.body.editStartTime,
                        'endTime': req.body.editEndTime,
                        'numNeeded': req.body.editNumNeeded,
                    },
                }
            );
        console.log("event edited");
        res.redirect(`/event/${req.params.id}`);
    } catch (err) {
        console.log(err);
    }
}
};
