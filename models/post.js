const mongoose = require("mongoose");

var postSchema = mongoose.Schema({
  name: String,
  description: String,
  gorsel1: String,
  gorsel2: String,
  gorsel3: String,
  gorsel4: String,
  gorsel5: String,
  user: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  
});

module.exports = mongoose.model("Post", postSchema);
