const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require('cookie-parser');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const eventRoutes = require("./routes/events");
const NHRoutes = require("./routes/nursinghomes");
const editProfileRoutes = require("./routes/editprofile");


//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

app.use(express.static(__dirname + '/public'));


//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

app.use(cookieParser('secret'));


// Setup Sessions - stored in MongoDB
app.use(
  session({
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

app.use(function(req, res, next){
  // if there's a flash message in the session request, make it available in the response, then delete it
  res.locals.sessionFlash = req.session.sessionFlash;
  delete req.session.sessionFlash;
  next();
});

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/event", eventRoutes);
app.use("/nh", NHRoutes);
app.use("/editprofile", editProfileRoutes);





//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
