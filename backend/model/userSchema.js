const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;
const JWT = require("jsonwebtoken");

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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

userSchema.methods = {
  jwtToken() {
    return (
      JWT.sign({ id: this._id, email: this.email }, process.env.SECRET),
      { expiresIn: "24h" }
    );
  },
};

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
