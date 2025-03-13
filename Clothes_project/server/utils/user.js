import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const genHashed = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

export const genToken = (_id) =>
  jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1h" });
