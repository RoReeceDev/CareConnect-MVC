const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  //look up referencense for nesting schemas, mongoose docs
  role: {
    isVolunteer: {type: Boolean, default: false},
    isNursingHome: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false},
  },
  profile: { 
    profilePhoto: {type: String, default: 'empty'},
    dateOfBirth: {type: String, default: 'empty' },
    bio: {type: String, default: 'empty'},
    location: {type: String, default: 'empty'},
  },
  events: [],
  password: String,
});

// Password hash middleware.

UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
