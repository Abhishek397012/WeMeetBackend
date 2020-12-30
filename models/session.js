const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const sessionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    sessionDateTime: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    hostId: {
      type: ObjectId,
      ref: "user",
      required: true,
    },
    wemeetId: {
      type: ObjectId,
      ref: "wemeet",
      required: true,
    },
    speakers: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("session", sessionSchema);
