const mongoose = require("mongoose");
const HistoryTaskSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  Tasks: [
    {
      taskName: {
        type: String,
        required: true,
        maxlength: 24,
        trim: true,
      },
      tagName: {
        type: String,
        required: true,
        maxlength: 24,
        trim: true,
      },
      taskStatus: {
        type: Number,
        required: true,
        maxlength: 24,
        trim: true,
      },
      creationTime: {
        type: Date,
        default: Date.now,
      },
      finishTime: {
        type: Date,
      },
      taskPriority: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("History_Tasks", HistoryTaskSchema);
