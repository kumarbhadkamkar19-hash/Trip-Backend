const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },

  isCollected: {
    type: Boolean,
    default: true,
  },

  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
    required: true,
  },
});

module.exports = mongoose.model("Item", itemSchema);
