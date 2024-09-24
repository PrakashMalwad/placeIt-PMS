const jwt = require("jsonwebtoken");

// Middleware to check authentication
const auth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "No token provided, authorization denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach user info to request
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Token has expired, please log in again" });
    }
    return res.status(401).json({ error: "Token is not valid" });
  }
};

// Middleware to check user role
const checkRole = (roles) => {
  if (!Array.isArray(roles)) {
    throw new Error("Roles must be an array");
  }

  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      console.warn(`Access denied for user ${req.user ? req.user.id : 'unknown'}, role: ${req.user ? req.user.role : 'none'}`);
      return res.status(403).json({ error: "Access denied: insufficient permissions" });
    }
    next();
  };
};

// Role-specific middleware
const isAdmin = checkRole(["admin"]);
const isStudent = checkRole(["student"]);
const isPlacementCell = checkRole(["placementcell-coordinator"]);
const isCompany = checkRole(["company"]);

module.exports = {
  auth,
  isAdmin,
  isStudent,
  isPlacementCell,
  isCompany,

};
