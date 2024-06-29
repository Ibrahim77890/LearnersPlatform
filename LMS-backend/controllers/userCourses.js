const expressAsyncHandler = require("express-async-handler");
const UserCourseProgress = require("../models/userCourseProgress");
const Courses = require("../models/course");
const { default: mongoose } = require("mongoose");
const Users = require("../models/user");




//@desc Get all personal courses
//@route Get /my-courses
//@access private for user
const getUserCourses = expressAsyncHandler(async (req, res, next) => {
    try {
        // Get the current user ID
        const userId = req.user._id;

        // Extract the UserCourseProgress model of our particular user
        const userCourses = await UserCourseProgress.findOne({ userId: userId });

        if (!userCourses) {
            return res.status(404).json({ error: "User course progress not found for the current user" });
        }

        // Extract course IDs array from the courses field of our object
        const courseIDs = userCourses.courses.map((courseObject) => courseObject.courseId);

        // Query the Courses model using the extracted course IDs
        const courses = await Courses.find({ _id: { $in: courseIDs } });

        // Extract the course names and course IDs from the retrieved courses
        const courseDetails = courses.map((course) => ({
            courseId: course._id,
            title: course.title,
            major: course.major
        }));

        res.status(200).json({ courses: courseDetails });
    } catch (e) {
        console.error("Error fetching user courses:", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

  


//@desc Get required particular courses
//@route Get /my-courses/:courseId
//@access private for user
const getUserCourse = expressAsyncHandler(async (req, res, next) => {
    try {
      // Get the current user ID
      const userId = req.user._id;
      const courseId = req.params.courseId;
  
      // Extract the UserCourseProgress model of our particular user
      const userCourses = await UserCourseProgress.findOne({ userId: userId });
  
      if (!userCourses) {
        console.log("User course progress not found for the current user");
        return res
          .status(201)
          .json({ error: "User course progress not found for the current user" });
      }

      // Log the userCourses to debug
      console.log("UserCourses: ", JSON.stringify(userCourses, null, 2));

      // Find the course with the given courseId
      const course = userCourses.courses.find(courseObject => {
        console.log("Given:", courseId.toString());
        console.log("Comparing with Course ID:", courseObject.courseId.toString());
        console.log(courseObject.courseId.toString().localeCompare(courseId.toString()))

        // Compare using localeCompare() to ensure consistent string comparison
        return courseObject.courseId.toString().localeCompare(courseId.toString()) === 0;
    });

      // Log the found course to debug
      console.log("Found Course: ", JSON.stringify(course, null, 2));
  
      if (!course) {
        console.log("Course not found for the current user");
        return res
          .status(201)
          .json({ error: "Course not found for the current user" });
      }
  
      // Return the contents array of the found course
      res.status(200).json({ contents: course.contents });
    } catch (error) {
      console.error("Error fetching user course:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

//@desc Add a new course
//@route POST /my-courses/add-new
//@access private
const postUserCourse = expressAsyncHandler(async (req, res, next) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ error: "User ID is missing" });
    }

    const courseId = req.body.courseId;
    if (!courseId) {
      return res.status(400).json({ error: "Course ID is missing" });
    }

    const course = await Courses.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Check if the course is already added to the user's courses
    const existingCourse = await UserCourseProgress.findOne({
      userId: userId,
      "courses.course": courseId,
    });

    if (existingCourse) {
      return res.status(400).json({ error: "Course already added" });
    }

    // Initialize course contents with isCompleted field
    const contentsWithCompletion = course.contents.map((contentItem) => ({
      contentItem: contentItem,
      isCompleted: false,
    }));

    // Check if a UserCourseProgress document already exists for the user
    let userCourseProgress = await UserCourseProgress.findOne({
      userId: userId,
    });

    if (!userCourseProgress) {
      // If not, create a new UserCourseProgress document
      userCourseProgress = new UserCourseProgress({
        userId: userId,
        courses: [
          {
            courseId: courseId,
            contents: contentsWithCompletion,
          },
        ],
      });
    } else {
      // If it exists, add the new course to the courses array
      userCourseProgress.courses.push({
        courseId: courseId,
        contents: contentsWithCompletion,
      });
    }

    // Save the updated document
    await userCourseProgress.save();

    res.status(200).json({ message: "Course added successfully" });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const updateUserCourse = expressAsyncHandler(async (req, res, next) => {
  try {
    // Get the current user ID
    const userId = req.user?._id;
    const { courseId, contentItemId, isCompleted } = req.body;

    // Find the user's course progress
    const userCourses = await UserCourseProgress.findOne({ user: userId });
    if (!userCourses) {
      return res
        .status(404)
        .json({ error: "User course progress not found for the current user" });
    }

    // Find the course in the user's progress
    const course = userCourses.courses.find(
      (courseItem) => courseItem.course.toString() === courseId
    );
    if (!course) {
      return res
        .status(404)
        .json({ error: "Course not found for the current user" });
    }

    // Find the content item in the course
    const contentItem = course.contents.find(
      (content) => content.contentItem.toString() === contentItemId
    );
    if (!contentItem) {
      return res
        .status(404)
        .json({ error: "Course content not found for the current user" });
    }

    // Update the completion status of the content item
    contentItem.isCompleted = isCompleted;

    // Save the updated user course progress
    await userCourses.save();

    res.json({ message: "Course content tracked successfully" });
  } catch (error) {
    console.error("Error updating course content:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  getUserCourses,
  getUserCourse,
  postUserCourse,
  updateUserCourse,
};
