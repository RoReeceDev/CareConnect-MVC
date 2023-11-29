const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");

module.exports = {

    //pass in users 
    getCreateProfile: async (req, res) => {
        try {
            const users = await User.find({ user: req.user.id });
            res.render("createprofile.ejs", { users: users, user: req.user, pageName: 'createprofile'});
        } catch (err) {
            console.log(err);
        }
    },

    updateProfile: async (req, res) => {
        try {
        
            // const result = await cloudinary.uploader.upload(req.file.path);
            if (req.user.role.isVolunteer == true) {
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
            if (req.user.role.isNursingHome == true) {
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
                    },
                );
            }
            console.log("profile updated");
            res.redirect(`/profile`);
        } catch (err) {
            console.log(err);
        }
    },
    editProfile: async (req, res) => {
        try {
            // const result = await cloudinary.uploader.upload(req.file.path);
            if (req.user.role.isVolunteer === true) {
                await User.findOneAndUpdate(
                    { _id: req.params.id },
                    {
                        $set: {
                            'profile.profileName': req.body.editVolunteerName,
                            'profile.bio': req.body.editVolunteerBio,
                            'profile.cityState': req.body.editVolunteerCityState,
                            'profile.zipcode': req.body.editVolunteerZipcode,
                        },
                    }
                );
            }
            
            if (req.user.role.isNursingHome === true) {
                await User.findOneAndUpdate(
                    { _id: req.params.id },
                    {
                        $set: {
                            'profile.profileName': req.body.editFacilityName,
                            'profile.contactName': req.body.editContactName,
                            'profile.contactNumber': req.body.editFacilityPhone,
                            'profile.bio': req.body.editFacilityBio,
                            'profile.address': req.body.editFacilityAddress,
                            'profile.cityState': req.body.editFacilityCityState,
                            'profile.zipcode': req.body.editFacilityZipcode,
                        },
                    }
                );
            }
            console.log("profile edited");
            res.redirect(`/profile`);
        } catch (err) {
            console.log(err);
        }
    }
}