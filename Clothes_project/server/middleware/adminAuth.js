import jwt from "jsonwebtoken";

export const adminAuth = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || req.headers.Authorization;

    if (!auth || !auth.startsWith("Bearer "))
      return res.status(401).json({ msg: "No token provided", success: false });

    const token = auth.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.key !== process.env.ADMIN_SECRET + process.env.ADMIN_EMAIL)
      return res.status(403).json({ msg: "Invalid token", success: false });

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError")
      return res.status(401).json({ msg: "Token expired", success: false });
    return res.status(500).json({ msg: err.message, success: false });
  }
};
