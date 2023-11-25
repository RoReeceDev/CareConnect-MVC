
const User = require("../models/User");
const Event = require("../models/Event");


module.exports = {
  getNH: async (req, res) => {
    try {
      const events = await Event.find({ user: req.params.id });
      res.render("nursinghome.ejs", { events: events, user: req.user, messages: req.flash('success'),
      messages: req.flash('info'), pageName: 'nursinghome'});
    } catch (err) {
      console.log(err);
    }
  },

  joinEvent: async (req, res) => {
    try {
      // Check if numNeeded for volunteers is more than 0
      const events = await Event.find({ _id: req.params.id });

      if (events[0].numNeeded > 0) {
        // Check if the user is already in the volunteers array
        const isUserAlreadyVolunteer = events[0].volunteers.includes(req.user.id);

        if (!isUserAlreadyVolunteer) {
          const result = await Event.findOneAndUpdate(
            { _id: req.params.id },
            {
              $inc: { numNeeded: -1 },
              $push: { volunteers: req.user.id },
            }
          ).lean();

          console.log("Volunteer -1");
          req.flash( 'success', 'You have successfully signed up for the event!');
        } else {
          console.log("User has already signed up for this event");
          req.flash('info','You have already signed up for this event.');

        }
        console.log(req.flash());

      }

      res.redirect(`/nh/${events[0].user}`);
    } catch (err) {
      console.log(err);
    }
  },
  unjoinEvent: async (req, res) => {
    try {

      const events = await Event.find({ _id: req.params.id });

      // Check if numNeeded for volunteers is more than 0
      if (events[0].numNeeded >= 0) {
        // Check if the user is already in the volunteers array
        const isUserAlreadyVolunteer = events[0].volunteers.includes(req.user.id);

        if (isUserAlreadyVolunteer) {
          const result = await Event.findOneAndUpdate(
            { _id: req.params.id },
            {
              $inc: { numNeeded: 1 },
              $pull: { volunteers: req.user.id },
            }
          ).lean();

          console.log("Volunteer +1");
          req.flash('success', 'You have successfully cancelled your sign up for the event!');
        } else {
          console.log("User has cancelled sign up for this event");
          req.flash('info','You have already cancelled sign up for this event or you were never signed up for this event.');

        }
        console.log(req.flash());
      }

      res.redirect(`/nh/${events[0].user}`);
    } catch (err) {
      console.log(err);
    }
  }
}