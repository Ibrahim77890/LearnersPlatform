const express = require("express");
const { verifyToken } = require("../middleware/verifyToken");
const { addCourseToCart, deleteCourseFromCart, removeCourseFromCart, getUserCart, postEnrollments, stripePaymentGateway } = require("../controllers/purchase");
const router = express.Router();

//Route to return your user course to frontend
router.route("/").get(verifyToken,getUserCart)

//Route to add a course which user wants to buy in his cart
router.route("/addToCart").post(verifyToken, addCourseToCart)

//Route to add a course which user wants to buy in his cart
router.route("/deleteFromCart").post(verifyToken, deleteCourseFromCart)

//Route to delete a particular course completely from the cart
router.route("/removeFromCart").post(verifyToken, removeCourseFromCart)

//Route to obtain all the enrollment keys a user will obtain as a result of multiple purchases of a single course
router.route("/enrollmentKeys").post(verifyToken,postEnrollments)

//Route
router.route("/purchase").post(verifyToken, stripePaymentGateway)

module.exports = router