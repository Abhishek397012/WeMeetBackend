const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const WeMeetSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDateTime: {
      type: Date,
      required: true,
    },
    endDateTime: {
      type: Date,
      required: true,
    },
    visibility: {
      type: String,
      required: true,
    },
    loungeTables: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
    },

    hostId: {
      type: ObjectId,
      ref: "user",
      required: true,
    },
    imgUrl: {
      type: String,
      required: false,
    },
    speakers: {
      type: Array,
      default: [],
    },
    sessions: {
      type: Array,
      default: [],
    },
    registrants: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("wemeet", WeMeetSchema);

// Status Values
// 0->Upcoming
// 1->Live
// 2->Completed
