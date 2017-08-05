const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_TOKEN;

const Auth = {
  verifyToken(req, res, next) {
    const token = req.headers.Authorization ||
      req.headers['x-access-token'];
    if (!token) {
      return res.status(401)
        .send({ message: 'Token required' });
    }

    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return res.status(401)
          .send({ message: 'Token Invalid' });
      }

      req.decoded = decoded;
      next();
    });
  }
};

module.exports = Auth;
