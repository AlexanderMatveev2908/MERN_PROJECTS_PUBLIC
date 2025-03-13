import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || req.headers.Authorization;

    if (!auth || !auth.startsWith("Bearer "))
      return res.status(401).json({ msg: "No token provided", success: false });

    const token = auth.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.body.user = decoded._id;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError")
      return res.status(401).json({ msg: "Token expired", success: false });

    return res.status(500).json({ msg: err.message, success: false });
  }
};
