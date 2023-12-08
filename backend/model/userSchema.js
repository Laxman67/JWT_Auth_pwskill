const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "user name is Required"],
      minLength: [5, "Name must be atleat 5 char"],
      maxLength: [50, "Name must be less than 50 char"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: [true, "Already Registered"],
      lowercase: true,
    },

    password: {
      type: String,
      select: false,
    },
    forgotPassword: {
      type: String,
    },
    forgetPasswordExpiryDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
