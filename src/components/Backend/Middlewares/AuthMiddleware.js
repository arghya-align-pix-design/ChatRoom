const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"]; //   ?.split(" ")[1] Get token from Authorization header

  if (!authHeader ) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token=authHeader;

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    ); // Verify the token
    //console.log(decoded);

    req.user = decoded; // Attach user info to request object
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token." });
  }
  //Call next Middleware
  next();
};

module.exports = authMiddleware;
