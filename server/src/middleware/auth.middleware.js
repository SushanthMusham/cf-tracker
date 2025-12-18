const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // get authorization header
  const authHeader = req.headers.authorization;

  try {
    // Get auth header
    const authHeader = req.headers.authorization;

    // Header missing
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access denied. No token provided."
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = {
      userId: decoded.UserId
    };

    // Continue to next middleware / controller
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }

};

module.exports = authMiddleware;