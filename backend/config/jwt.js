const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

module.exports = {
	JWT_SECRET,
	JWT_EXPIRES_IN,
	generateToken: (payload) => {
		return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
	},
	verifyToken: (token) => {
		return jwt.verify(token, JWT_SECRET);
	},
};
