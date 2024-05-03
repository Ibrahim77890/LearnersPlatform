/*
Here i wanted to make routes for the user so I can keep track for his doings in his course,
I want to give details and contents of his course and then deliver the files which he is going to see
*/

const express = require("express");
const {
    verifyToken,
    verifyTokenAndAdmin,
  } = require("../middleware/verifyToken");
const { getUserCourses, getUserCourse } = require("../controllers/userCourses");
const router = express.Router();


//Route to get all the courses and their respective information
router.route('/my-courses').get(verifyToken,getUserCourses);

//Get tracked info about a particular course of that user
router.route('/my-courses/:courseId').get(verifyToken, getUserCourse);

//Add a new course information about a particular user
router.route('/my-courses/:courseId').post(verifyToken);
