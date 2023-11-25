const User = require("../models/User");


module.exports = {

    //find all nursing home users and display
    getBoard: async (req, res) => {
        try {
          const users = await User.find().lean();
          res.render("board.ejs", { users: users, pageName: 'board'});
        } catch (err) {
          console.log(err);
        }
      }
}