const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  name:{type: String, required: true},
  email:{type: String, required: true},
  password:{type: String, required: true},
  id:{type: String},
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("User", userSchema);
