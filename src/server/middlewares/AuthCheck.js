const OAuthClient = require('../utils/oAuthClient');

module.exports = (req, res, next) => {
  
  req.oAuthClient = new OAuthClient(req);

  next();
};