const { verifyToken } = require("../config/jwt");

// Authenticate user middleware - extracts user info from token
const authenticate = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		// Check if authorization header exists and has correct format
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({
				success: false,
				message: "Authentication required - Bearer token missing"
			});
		}

		// Extract token from header
		const token = authHeader.split(" ")[1];

		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Authentication required - Token missing"
			});
		}

		// Verify and decode token
		const decoded = verifyToken(token);

		// Attach decoded user info to request object
		req.user = {
			id: decoded.id || decoded.userId,
			role: decoded.role,
			email: decoded.email,
			...decoded // Include any other properties from token
		};


		next();
	} catch (error) {
		console.error("Authentication error:", error.message);

		// Handle specific JWT errors
		if (error.name === 'TokenExpiredError') {
			return res.status(401).json({
				success: false,
				message: "Token has expired"
			});
		}

		if (error.name === 'JsonWebTokenError') {
			return res.status(401).json({
				success: false,
				message: "Invalid token"
			});
		}

		return res.status(401).json({
			success: false,
			message: "Invalid or expired token"
		});
	}
};

// Role-based authorization middleware
const authorizeAdmin = (roles = ['admin']) => {
	return (req, res, next) => {
		try {
			// Check if user exists (should be set by authenticate middleware)
			if (!req.user) {
				return res.status(401).json({
					success: false,
					message: "Authentication required - User not found"
				});
			}

			// Check if user role exists
			if (!req.user.role) {
				return res.status(403).json({
					success: false,
					message: "Forbidden: User role not defined"
				});
			}

			// Check if user has required role
			if (!roles.includes(req.user.role)) {
				return res.status(403).json({
					success: false,
					message: `Forbidden: Requires ${roles.join(' or ')} role, but user has ${req.user.role}`
				});
			}

			next();
		} catch (error) {
			console.error("Authorization error:", error.message);
			return res.status(500).json({
				success: false,
				message: "Authorization check failed"
			});
		}
	};
};

// Convenience middleware combinations
const requireAuth = authenticate;
const requireAdmin = [authenticate, authorizeAdmin(['admin'])];
const requireAdminOrModerator = [authenticate, authorizeAdmin(['admin', 'moderator'])];

// Helper function to get user info from token without authentication
const getUserFromToken = (req) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return null;
		}

		const token = authHeader.split(" ")[1];
		if (!token) return null;

		const decoded = verifyToken(token);
		return {
			id: decoded.id || decoded.userId,
			role: decoded.role,
			email: decoded.email,
			...decoded
		};
	} catch (error) {
		console.error("Error extracting user from token:", error.message);
		return null;
	}
};

module.exports = {
	authenticate,
	authorizeAdmin,
	requireAuth,
	requireAdmin,
	requireAdminOrModerator,
	getUserFromToken
};