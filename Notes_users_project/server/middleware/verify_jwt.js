const jwt = require("jsonwebtoken");

const verify_jwt = async (req, res, next) => {
  const auth_headers = req.headers?.authorization || req.headers?.Authorization;

  if (!auth_headers?.startsWith("Bearer "))
    return res
      .status(403)
      .json({ success: false, message: "=> no token provided , unauthorized" });

  const token = auth_headers.split(" ")[1];

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
    if (err)
      return res
        .status(403)
        .json({ success: false, message: "=> invalid token, forbidden" });

    req.user = decoded.user_info.username;
    req.roles = decoded.user_info.roles;

    next();
  });
};

module.exports = verify_jwt;
