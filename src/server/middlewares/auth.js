import authController from '../utils/authController';

export default (req, res, next ) => {
  
  req.authController = new authController(req.session.user);

  next();
};