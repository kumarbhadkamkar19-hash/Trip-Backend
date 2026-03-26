const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
{
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  location: { type: String, required: true },

  startDate: { type: Date, required: true },

  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value >= this.startDate;
      },
      message: "End date must be after start date"
    }
  },

  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item"
    }
  ]

},
{ timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);