const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: 8,
    maxlength: 24,
    trim: true,
    validate: (value) => {
      for (let i = 0; i < value.length; i++) {
        if (value[i] === " ") throw new Error("No space allowed");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 24,
    trim: true,
    validate: (value) => {
      if (value === "password")
        throw new Error("Password cannot contain password");
      for (let i = 0; i < value.length; i++) {
        if (value[i] === " ") throw new Error("No space allowed");
      }
    },
  },
  creationTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Users", UserSchema);
