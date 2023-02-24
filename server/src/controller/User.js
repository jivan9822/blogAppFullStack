const { CatchAsync } = require('../ErrorHandler/CatchAsync');
const Blog = require('../Model/blogModel');
const Comment = require('../Model/commentModel');
const User = require('../Model/userModel');

exports.userSignUp = CatchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    status: true,
    message: 'User created success!',
    user,
  });
});

exports.userLogin = CatchAsync(async (req, res, next) => {
  res.cookie('jwt', req.token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });
  res.status(200).json({
    status: true,
    message: 'Login success!',
    data: {
      token: req.token,
      user: req.user,
    },
  });
});

exports.logOutHandler = CatchAsync(async (req, res, next) => {
  res.cookie('jwt', null);
  res.status(200).json({
    status: true,
    message: 'Logout success!',
  });
});

exports.isValidUser = CatchAsync(async (req, res, next) => {
  return res.status(200).json({
    status: true,
    message: 'success',
    data: {
      user: req.user,
    },
  });
});

exports.addBlogHandler = CatchAsync(async (req, res, next) => {
  req.body.data.user = req.user._id;
  req.body.data.userName = req.user.username;
  req.body.data.publishAt = new Date(Date.now()).toLocaleString();
  const blog = await Blog.create(req.body.data);
  console.log(blog);
  res.status(201).json({
    status: true,
    message: 'success',
    data: {
      blog,
    },
  });
});

exports.getAllBlogs = CatchAsync(async (req, res, next) => {
  const blogs = await Blog.find();
  res.status(200).json({
    status: true,
    message: `${blogs.length} blogs found!`,
    data: {
      blogs,
    },
  });
});

exports.getOneBlog = CatchAsync(async (req, res, next) => {
  console.log(req.query.id);
  const blog = await Blog.findOne({ _id: req.query.id }).populate('comments');
  console.log(blog);
  res.status(200).json({
    status: true,
    message: 'Success',
    data: {
      blog,
    },
  });
});

exports.addComments = CatchAsync(async (req, res, next) => {
  req.body.userId = req.user._id;
  req.body.userName = req.user.username;
  req.body.time = new Date(Date.now()).toLocaleString();
  const comment = await Comment.create(req.body);
  res.status(201).json({
    status: true,
    message: 'Comment Added',
    data: {
      comment,
    },
  });
});

exports.updateLikeDisLike = CatchAsync(async (req, res, next) => {
  let newArr = req.body.displaYComments;
  const blog = await Blog.findById({ _id: req.body.blogId }).populate(
    'comments'
  );
  newArr = newArr.reverse();
  for (let i = 0; i < newArr.length; ++i) {
    blog.comments[i].like = newArr[i].like;
    blog.comments[i].disLike = newArr[i].disLike;
    blog.comments[i].save();
  }
  res.send('UpdateCommentCount');
});
