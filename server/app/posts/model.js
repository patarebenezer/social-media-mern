const mongoose = require("mongoose");

let postSchema = mongoose.Schema({
  title: {
    type: String,
  },
  message: {
    type: String,
  },
  name:{
    type: String
  },
  creator: {
    type: String,
  },
  tags: {
    type: [String],
  },
  selectedFile: {
    type: String,
  },
  likeCount: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Post", postSchema);
