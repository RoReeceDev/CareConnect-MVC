const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");

module.exports = {

    //pass in users 
    getCreateProfile: async (req, res) => {
        try {
            console.log(req.user)
            const users = await User.find({ user: req.user.id });
            res.render("createprofile.ejs", { users: users, user: req.user });
        } catch (err) {
            console.log(err);
        }
    },

    updateProfile: async (req, res) => {
        try {
            console.log(req.user)
            //work on this later maybe conditional
            // const result = await cloudinary.uploader.upload(req.file.path);
            if (req.user.role.isVolunteer === true) {
                await User.findOneAndUpdate(
                    { _id: req.params.id },
                    {
                        $set: {
                            profile: {
                                profileName: req.body.volunteerName,
                                userAge: req.body.volunteerAge,
                                bio: req.body.volunteerBio,
                                cityState: req.body.volunteerCityState,
                                zipcode: req.body.volunteerZipcode,
                            },
                        },
                    }
                );
            }
            if (req.user.role.isNursingHome === true) {
                await User.findOneAndUpdate(
                    { _id: req.params.id },
                    {
                        $set: {
                            profile: {
                                profileName:req.body.facilityName,
                                contactName:req.body.contactName,
                                contactNumber: req.body.facilityPhone,
                                bio: req.body.facilityBio,
                                address: req.body.facilityAddress,
                                cityState: req.body.facilityCityState,
                                zipcode: req.body.facilityZipcode,
                            },
                        },
                    }
                );
            }
            console.log("profile updated");
            res.redirect(`/profile`);
        } catch (err) {
            console.log(err);
        }
    }
}