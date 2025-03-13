import mongoose from "mongoose";
import { REG_EMAIL, REG_NAME, REG_PASSWORD } from "../constants/regex.js";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      match: REG_NAME,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: REG_EMAIL,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  { minimize: false }
);

const User = mongoose.models.User || mongoose.model("user", UserSchema);

export default User;
