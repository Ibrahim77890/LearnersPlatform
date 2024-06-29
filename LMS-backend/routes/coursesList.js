const express = require("express");
const { verifyToken, verifyTokenAndAdmin } = require("../middleware/verifyToken");
const {getLatestCourses, getFreeCourses, getMajorCourses, getTopCourses, getSearchCourses, getAllCourses} = require("../controllers/coursesList")

const router = express.Router()

//return courses which are 15 days previously uploaded
router.route("/latest").get(getLatestCourses)

//return courses which are free of cost
router.route("/free").get(getFreeCourses)

//return courses which are on hot sale
router.route("/top").get(getTopCourses);

router.route("/alldata").get(verifyTokenAndAdmin, getAllCourses);

//return courses satisfying search bar
router.route("/search").get(getSearchCourses);

//return courses of a particular major
router.route("/:major").get(getMajorCourses)



module.exports = router