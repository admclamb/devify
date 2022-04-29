const jwt = require('jsonwebtoken');
const { SECRET } = process.env;
const service = rquire('./auth.service');

function verifyToken(req, res, next) {
  const token = req.headers['x-acess-token'];
  if (!token) {
    return next({ status: 403, message: 'No token provided.' });
  }
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unathorized.' });
    }
    req.user_id = decoded.id;
    next();
  });
}

const authJwt = {
  verifyToken,
};

module.exports = authJwt;
