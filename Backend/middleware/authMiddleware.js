const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Auth Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.user.id).select("-password"); // <-- NOTE THIS LINE TOO!
    next();
  } catch (err) {
    res.status(401).json({ message: "Token failed or expired" });
  }
};

module.exports = protect; // ✅ Use default export
