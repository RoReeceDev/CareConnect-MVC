const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");

module.exports = {

    //pass in users 
    getCreateProfile: async (req, res) => {
        try {
            console.log(req.user.id)
          const users = await User.find({ user: req.user.id });
          console.log(users)
          res.render("createprofile.ejs", { users: users, user: req.user });
        } catch (err) {
          console.log(err);
        }
    },

    updateProfile: async (req, res) => {
        try {
            //work on this later maybe conditional
            // const result = await cloudinary.uploader.upload(req.file.path);
            await User.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $set: {
                        profile: {
                            profileName: req.body.userName,
                            dateOfBirth: req.body.userDOB,
                            bio: req.body.userBio,
                            location: req.body.userLocation,
                        }
                    },
                }
            );
            console.log("profile updated");
            res.redirect(`/profile`);
        } catch (err) {
            console.log(err);
        }
    }
}