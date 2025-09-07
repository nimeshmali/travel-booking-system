const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

module.exports = {
	generateToken: (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN }),
	verifyToken: (token) => jwt.verify(token, JWT_SECRET),
};
