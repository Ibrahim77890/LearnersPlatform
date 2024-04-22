const express = require('express');
const { postSignUp, postSignIn, getLogout, postDeleteUser } = require('../controllers/auth');
const { verifyToken, verifyTokenAndAdmin} = require('../middleware/verifyToken');
const router = express.Router();

//User SignUp
router.route('/app/sign-up').post(postSignUp);

//User SignIn
router.route('/app/sign-in').post(postSignIn);

//User Logout
router.route('/app/logout').get(verifyToken, getLogout);

router.route('/app/delete-user/:userId').post(verifyTokenAndAdmin, postDeleteUser);

module.exports = router;
