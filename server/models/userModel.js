import mongoose from "mongoose";
import validation from "validator";
import bcrypt from "bcryptjs";
import { environment } from "../utils/environment.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return validation.isEmail(value);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    password: {
      type: String,
    },
    photo: {
      type: String,
      required: [true, "Please provide pic"],
    },
    OAuthId: {
      type: String,
      unique: true,
    },
    OAuthProvider: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    loginCount: {
      type: Number,
      default: 1,
    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
    doubleVerify: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.checkPassword = function (given_password) {
  //   WORK: CHECK IF USER PASSWORD DOES NOT MATCH WITH HASH PASSWORD
  const checkPassword = bcrypt.compareSync(given_password, this.password); // Boolean

  return checkPassword;
};

userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, environment.SALT_ROUND);

  next();
});

export const User = mongoose.model("User", userSchema);
