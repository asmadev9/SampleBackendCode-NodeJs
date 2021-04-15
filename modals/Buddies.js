const mongoose = require("mongoose");

const buddySchema = mongoose.Schema({
  data: [
    {
      toy_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Toy",
        required: true,
      },
      userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      toyData: {
        type: Object,
        required: [true, "Please add a toy"],
      },
    },
  ],
});

module.exports = mongoose.model("Buddy", buddySchema);
