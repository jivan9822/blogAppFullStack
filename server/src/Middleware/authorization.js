const { CatchAsync } = require('../ErrorHandler/CatchAsync');
const AppError = require('../ErrorHandler/AppError');
const jwt = require('jsonwebtoken');
const User = require('../Model/userModel');
const { promisify } = require('util');
const { setUser, getUser } = require('../Utils/Redis');

exports.authenticate = CatchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  const user = await User.findOne({ username: username }).select('+password');
  if (!user || !(await user.comparePass(password, user.password))) {
    return next(new AppError('Wrong username or password!', 400));
  }

  const token = jwt.sign({ id: user._id }, process.env.SEC_STRING);
  setUser(token, user);
  console.log(token);
  req.token = token;
  user.password = undefined;
  req.user = user;
  next();
});

exports.protect = CatchAsync(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(
      new AppError(
        'You are not authorize to access this route! Please Login to get access!',
        403
      )
    );
  }

  const user = await getUser(token);
  if (!user) {
    return next(new AppError('You are not loggedIn! Please Login!', 401));
  }

  req.user = user;
  next();
});
