const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({
      success: false,
      message: "=> Username and password are required",
    });

  const existing_user = await User.findOne({ username });

  if (!existing_user)
    return res.status(401).json({
      success: false,
      message: "=> invalid credentials, user does not exist",
    });

  if (!existing_user.active)
    return res
      .status(403)
      .json({ success: false, message: "=> user is inactive" });

  const match = await bcrypt.compare(password, existing_user.password);

  if (!match)
    return res
      .status(401)
      .json({ success: false, message: "=> Invalid password" });

  const access_token = jwt.sign(
    {
      user_info: {
        username: existing_user.username,
        roles: existing_user.roles,
      },
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "5m" }
  );

  const refresh_token = jwt.sign(
    {
      username: existing_user.username,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("jwt", refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ success: true, access_token });

  try {
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const refresh = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies.jwt)
    return res
      .status(401)
      .json({ success: false, message: "=> no token provided" });

  const refresh_token = cookies.jwt;

  try {
    const decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET);

    const found_user = await User.findOne({ username: decoded.username });

    if (!found_user)
      return res
        .status(401)
        .json({ success: false, message: "=> user not found, unauthorize" });

    const access_token = jwt.sign(
      {
        user_info: {
          username: found_user.username,
          roles: found_user.roles,
        },
      },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "5m" }
    );

    res.status(200).json({ success: true, access_token });
  } catch (err) {
    res
      .status(403)
      .json({ success: false, message: "=> invalid refresh token, forbidden" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res
      .status(200)
      .json({ success: true, message: "=> logout successful, cookie cleared" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { login, refresh, logout };
