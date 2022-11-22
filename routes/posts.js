const express = require("express");
const router = express.Router({ mergeParams: true });
const Post = require("../models/post");
const middleware = require("../middleware");

router.get("/", (req, res) => {
  //Get all posts from DB
  Post.find({}, (err, allposts) => {
    if (err) {
      console.log("Error in find");
      console.log(err);
    } else {
      res.render("posts/index", {
        posts: allposts.reverse(),
        currentUser: req.user,
      });
    }
  });
});
router.get("/", (req, res) => {
  //Get all posts from DB
  Post.find({}, (err, allposts) => {
    if (err) {
      console.log("Error in find");
      console.log(err);
    } else {
      res.render("/aksiyon", {
        posts: allposts.reverse(),
        currentUser: req.user,
      });
    }
  });
});
const discord = require("discord.js");
const client = new discord.Client();
     //const channel = client.channels.cache.get("1043477432004517908");
//console.log(channel)
 ///const attachment = new discord.MessageAttachment(gorsel1, "")
//  client.channels.cache.get("1043477432004517908").send("attachment")

//CREATE- add new post to DB
router.post("/", middleware.isLoggedIn, (req, res) => {
  // add new post


        //c.send(req.attachment.gorsel1); 
 // const attachment1 = client.channels.get('1043477432004517908').attachments.first();
//const url1 = attachment1 ? attachment1.url : null;
  
  var name = req.body.name;
  var gorsel1 = req.body.gorsel1;
  var gorsel2 = req.body.gorsel2;
  var gorsel3 = req.body.gorsel3;
  var gorsel4 = req.body.gorsel4;
  var gorsel5 = req.body.gorsel5;
  var desc = req.body.description;
  var user = req.body.username
  
  var author = {
    id: req.user._id,
  };

  var newPost = {
    name: name,
    user: user,
    description: desc,
    gorsel1: gorsel1,
    gorsel2: gorsel2,
    gorsel3: gorsel3,
    gorsel4: gorsel4,
    gorsel5: gorsel5,
  };
  //Save to database
  Post.create(newPost, (err, newlyCreated) => {
    if (err) {
      console.log("Error in inserting into DB");
    } else {
      res.redirect("/posts");
    }
  });
});

//NEW - show form to create new posts
router.get("/publish", middleware.isLoggedIn, (req, res) => {
  res.render("posts/new");
});

//SHOW - render show template with given id
router.get("/:id", function (req, res) {
  //find the post with provided id
  Post.findById(req.params.id)
    .populate("comments")
    .exec((err, foundPost) => {
      if (err) {
        console.log("Error occurced in finding ID");
      } else {
        //render show template with that post
        res.render("posts/show", { post: foundPost });
      }
    });
});

//=================EDIT POST ROUTE=====================
router.get("/:id/edit", middleware.checkPostOwnership, (req, res) => {
  Post.findById(req.params.id, (err, foundPost) => {
    res.render("posts/edit", { post: foundPost });
  });
});

//UPDATE POST ROUTE
router.put("/:id", middleware.checkPostOwnership, (req, res) => {
  //find and update
  Post.findByIdAndUpdate(req.params.id, req.body.post, (err, updatedPost) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/posts/" + req.params.id);
    }
  });
});

//DESTROY POST ROUTE
router.delete("/:id", middleware.checkPostOwnership, (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.redirect("/posts");
    } else {
      res.redirect("/posts");
    }
  });
});

module.exports = router;
