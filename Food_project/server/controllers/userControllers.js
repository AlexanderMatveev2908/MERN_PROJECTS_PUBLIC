import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

const registerUser = async (req, res) => {
  const { name, password, email } = req.body;

  if (![name, password, email].every(Boolean))
    return res
      .status(400)
      .json({ message: "=> All fields are required ADD_FOOD" });
  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "=> Email already exists" });

    if (!validator.isEmail(email))
      return res.status(400).json({ message: "=> Invalid email format" });

    if (password.length < 8)
      return res
        .status(400)
        .json({ message: "=> Password must be at least 8 characters long" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      name,
      email,
      password: hashed,
    });

    const token = createToken(user._id);

    res.status(201).json({ ok: true, token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (![email, password].every(Boolean))
    return res
      .status(400)
      .json({ message: "=> All fields are required ADD_FOOD" });
  try {
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser)
      return res
        .status(400)
        .json({ message: "=> no account with these credentials" });

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch)
      return res.status(400).json({ message: "=> Invalid password" });

    const token = createToken(existingUser._id);

    res.status(200).json({ ok: true, token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export { loginUser, registerUser };
