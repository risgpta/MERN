const mongoose = require("mongoose");
const TagSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  Tags: [
    {
      tagName: {
        type: String,
        required: true,
        maxlength: 24,
        trim: true,
      },
      creationTime: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("Tags", TagSchema);
