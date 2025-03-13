import User from "../models/User.js";
import { genHashed, genToken } from "../utils/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ msg: "User does not exist", success: false });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(400).json({ msg: "Invalid credentials", success: false });

  const token = genToken(user._id);

  return res.status(200).json({ token, success: true });
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ msg: "User already exists", success: false });

  const hashed = await genHashed(password);

  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  const token = genToken(user._id);

  return res.status(201).json({ token, success: true });
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  )
    return res.status(400).json({ msg: "Invalid credentials", success: false });

  const token = jwt.sign(
    { key: process.env.ADMIN_SECRET + email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return res.status(200).json({ token, success: true });
};
