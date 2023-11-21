
const Event = require("../models/Event");
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
        console.log(req.user.id)
      const events = await Event.find({ user: req.user.id });
      console.log(events)
      res.render("profile.ejs", { events: events, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const events = await Event.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { events: events });
    } catch (err) {
      console.log(err);
    }
  },
  getEvent: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      res.render("post.ejs", { event: event, user: req.user});
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
