const User = require("../models/User");
const Note = require("../models/Note");
const bcrypt = require("bcrypt");

const get_all_users = async (req, res) => {
  try {
    const users = await User.find({}).select("-password").lean();

    if (!users?.length)
      return res
        .status(404)
        .json({ success: false, message: "=> No users found" });

    return res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const get_user = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "=> User not found" });

    return res.status(200).json({ success: true, user });
  } catch (err) {
    if (err.name === "CastError")
      return res.status(400).json({ success: false, message: "invalid id" });

    res.status(500).json({ success: false, err, message: err.message });
  }
};

const create_user = async (req, res) => {
  try {
    const { username, password, roles } = req.body;

    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, message: "=> Invalid input" });

    const duplicate = await User.findOne({ username })
      .collation({ locale: "en", strength: 3 })
      .lean();

    if (duplicate)
      return res
        .status(409)
        .json({ success: false, message: "=> Username already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user_roles = Array.isArray(roles) && roles.length ? roles : undefined;

    const user = User.create({
      username,
      password: hashed,
      roles: user_roles,
    });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "=> invalid data received" });

    res.status(201).json({
      success: true,
      message: `user ${username} created successfully`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const update_user = async (req, res) => {
  try {
    const { id, username, password, roles, active } = req.body;

    console.log(req.body);

    if (
      !id ||
      !username ||
      !Array.isArray(roles) ||
      !roles.length ||
      typeof active !== "boolean"
    )
      return res
        .status(400)
        .json({ success: false, message: "=> Invalid input" });

    const user = await User.findById(id);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "=> User not found" });

    const duplicate = await User.findOne({ username })
      .collation({ locale: "en", strength: 3 })
      .lean();

    if (duplicate && duplicate._id.toString() !== id)
      return res
        .status(409)
        .json({ success: false, message: "=> Username already exists" });

    user.username = username;
    user.roles = roles;
    user.active = active;

    if (password) user.password = await bcrypt.hash(password, 10);

    const updated_user = await user.save();

    res.status(200).json({
      success: true,
      message: `${updated_user.username} updated successfully`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const delete_user = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id)
      res.status(400).json({ success: false, message: "=> Invalid input" });

    const note = await Note.findOne({ user: id }).lean();

    if (note)
      return res
        .status(400)
        .json({ success: false, message: "=> User has notes" });

    const user = await User.findById(id);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "=> User not found" });

    const result = await user.deleteOne();

    const reply = `username: ${user.username} with ID ${user._id} deleted successfully`;

    res.status(200).json({ success: true, message: reply });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  get_all_users,
  get_user,
  create_user,
  update_user,
  delete_user,
};
