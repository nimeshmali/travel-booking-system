const { verifyToken } = require("../config/jwt");

// Authenticate user middleware
const authenticate = (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) {
			return res.status(401).json({ message: "Authentication required" });
		}

		const decoded = verifyToken(token);
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(401).json({ message: "Invalid or expired token" });
	}
};

// Admin authorization middleware
const authorizeAdmin = (req, res, next) => {
	if (!req.user.isAdmin) {
		return res.status(403).json({ message: "Forbidden: Admin access required" });
	}
	next();
};

module.exports = { authenticate, authorizeAdmin };
