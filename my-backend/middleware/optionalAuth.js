const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  // If no auth header, continue without setting userId
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.userId = null;
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
  } catch (err) {
    // If token is invalid, continue without setting userId
    req.userId = null;
  }
  
  next();
}

module.exports = optionalAuth;
