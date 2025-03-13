import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers?.authorization || req.headers?.Authorization;

  if (!authHeaders?.startsWith("Bearer "))
    return res
      .status(403)
      .json({ message: "=> no token provided , unauthorized" });

  const token = authHeaders.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "=> Unauthorized" });
  }
};

export default authMiddleware;
