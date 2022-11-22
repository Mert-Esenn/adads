const discord = require("discord.js");
const client = new discord.Client();
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const User = require("./models/user");

//---------DATABASE SETUP------------------
const mongo_uri = process.env.mongo_uri; 

const connect = mongoose.connect(mongo_uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
connect.then(
  (db) => {
    console.log("Veri merkezine bağlandı");
  },
  (err) => {
    console.log("Veri merkezinde Hata ", err);
  }
);
// --------------------------------------
client.login(process.env.token)
//-------------GENRAL CONFIGURATION----------
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//-------------------------------------------

//------------ROUTERS------------------------
const commentRoutes = require("./routes/comments");
const postRoutes = require("./routes/posts");
const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/user");
//---------------------------------------------
const log = message => {
  console.log(` ${message}`);
};
require('./util/eventLoader.js')(client);

//------------PASSPORT CONFIGURATION-----------
app.use(
  require("express-session")({
    secret: "I am the best",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//to get current logged in user
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
//------------------------------------------------

//  client.channels.cache.get("1043477432004517908").send("attachment")




app.use("/", indexRoutes);
app.use("/posts", postRoutes);
app.use("/aksiyon", postRoutes);
app.use("/posts/:id/comments", commentRoutes);
app.use("/user", userRoutes);

let port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`Server Listening at http://localhost:${port}`);
});


