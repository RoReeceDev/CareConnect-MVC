const mongoose = require("mongoose");
const Event = require("../models/Event");
const User = require("../models/User");



module.exports = {
  getProfile: async (req, res) => {
    try {
      let events = []
      if(req.user.role.isVolunteer === false){
       events = await Event.find({ user: req.user.id }).sort({createdAt: "desc"});
      }else{
       events = await Event.find({ volunteers: req.user.id }).sort({eventDate: "ascending"});
      }
      res.render("profile.ejs", { events: events, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getBoard: async (req, res) => {
    try {
      const events = await Event.find().sort({ createdAt: "desc" }).lean();
      res.render("board.ejs", { events: events });
    } catch (err) {
      console.log(err);
    }
  },
  getEvent: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      const volunteers = await User.find({ '_id': { $in: event.volunteers.map(id => mongoose.Types.ObjectId(id)) } })
      res.render("event.ejs", { event: event, user: req.user, volunteers: volunteers});
    } catch (err) {
      console.log(err);
    }
  },
  createEvent: async (req, res) => {
    try {


      await Event.create({
        name: req.body.eventName,
        eventDate: req.body.eventDate,
        startTime: req.body.sTime,
        endTime: req.body.eTime,
        numNeeded: req.body.numNeeded,
        user: req.user.id,
      });
      console.log("Event has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
//   likePost: async (req, res) => {
//     try {
//       await Post.findOneAndUpdate(
//         { _id: req.params.id },
//         {
//           $inc: { likes: 1 },
//         }
//       );
//       console.log("Likes +1");
//       res.redirect(`/post/${req.params.id}`);
//     } catch (err) {
//       console.log(err);
//     }
//   },
  deleteEvent: async (req, res) => {
    try {
      // Find post by id
      let event = await Event.findById({ _id: req.params.id });

      // Delete post from db
      await Event.remove({ _id: req.params.id });
      console.log("Deleted Event");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
