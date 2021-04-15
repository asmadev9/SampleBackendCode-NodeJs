const mongoose = require("mongoose");

const ToySchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title for toy"],
  },
  lastSeen: {
    type: Date,
    default: new Date().getTime(),
  },
  image: {
    type: String,
    required: [true, "Please add a photo"],
  },
  mode: {
    type: String,
    default: "happy",
  },
  location: {
    latitude: {
      type: Number,
      default: 37.788033142255905,
    },
    longitude: {
      type: Number,
      default: -122.441490771673,
    },
  },
  locationText: {
    type: String,
    required: [true, "Please add a location Text"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = mongoose.model("Toy", ToySchema);
