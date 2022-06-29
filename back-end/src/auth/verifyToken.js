const jwt = require('jsonwebtoken');
const { TOKEN_KEY } = process.env;
async function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, TOKEN_KEY);
    return next();
  } catch (error) {
    return next({ status: 401, message: error });
  }
}

module.exports = verifyToken;
