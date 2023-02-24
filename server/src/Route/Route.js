const router = require('express').Router();
const user = require('../controller/User');
const auth = require('../Middleware/authorization');

router.post('/signup', user.userSignUp);

router.post('/login', auth.authenticate, user.userLogin);
router.get('/isValid', auth.protect, user.isValidUser);
router.get('/logout', user.logOutHandler);

router.post('/blog', auth.protect, user.addBlogHandler);
router.post('/comment', auth.protect, user.addComments);

router.get('/getblog', user.getAllBlogs);

router.get('/getOneBlog', auth.protect, user.getOneBlog);

router.post('/updateLikeDisLike', auth.protect, user.updateLikeDisLike);

module.exports = router;
