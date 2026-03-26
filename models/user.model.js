const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    age: Number,

    phone: {
      type: String,
      match: /^[0-9]{10}$/,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    dob: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
