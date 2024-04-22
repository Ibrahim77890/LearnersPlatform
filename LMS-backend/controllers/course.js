const expressAsyncHandler = require("express-async-handler");
const Courses = require("../models/course");

//@desc Add a Course
//@route Post /courses/new-course
//@access public
const postCourse = expressAsyncHandler(async (req, res, next) => {
  try {
    const newCourse = await Courses.addCourse(req);
    res
      .status(201)
      .json({ message: "Course added successfully", course: newCourse });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//@desc Return a Course
//@route GET /courses/:courseId
//@access public
const getCourse = expressAsyncHandler(async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const requiredCourse = await Courses.findById(courseId);
    if (requiredCourse) {
      res.status(200).json(requiredCourse);
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    console.error("Error obtaining course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//@desc Update a Course
//@route Put /courses/:courseId
//@access public
const updateCourse = expressAsyncHandler(async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const updatedData = req.body;

    const editingCourse = await Courses.findByIdAndUpdate(
      courseId,
      updatedData,
      { new: true }
    );
    if (editingCourse) {
      res
        .status(200)
        .json({ message: "Course updated successfully", editingCourse });
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//@desc Delete a Course
//@route Delete /courses/:courseId
//@access public
const deleteCourse = expressAsyncHandler(async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const deletedCourse = await Courses.findByIdAndDelete(courseId);
    if (deletedCourse) {
      res
        .status(200)
        .json({ message: "Course deleted successfully", deletedCourse });
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { postCourse, getCourse, deleteCourse, updateCourse };
