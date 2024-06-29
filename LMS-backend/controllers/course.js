const expressAsyncHandler = require("express-async-handler");
const Courses = require("../models/course");
const cloudinary = require("../config/cloudinary");

//@desc Add a Course
//@route Post /courses/new-course
//@access public
const postCourse = expressAsyncHandler(async (req, res, next) => {
  try {
    // Create a new instance of the Course model
    const newCourse = new Courses();
    
    // Call the addCourse method on the new instance
    const newAddedCourse = await newCourse.addCourse(req);
    res
    .status(201)
    .json({ message: "Course added successfully", course: newAddedCourse });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
console.log("okkk");

const postFiles = expressAsyncHandler(async(req, res, next)=>{
  try {
    const imageFile = req.files["image"] ? req.files["image"][0] : null;
    console.log(imageFile);
    const result = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: 'auto',
      folder: "course_images",
      width: 500,
      height: 500,
      crop: 'fill',
    });
    imageMetadata = {
      path: result.secure_url,
      originalName: imageFile.originalname,
      mimeType: imageFile.mimetype,
      size: imageFile.size,
    };
  } catch (error) {
    console.error("Error adding course:", error);
  }
})

//@desc Return a Course
//@route GET /courses/:courseId/details
//@access private
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

//@desc Return a Preview Course
//@route GET /courses/:courseId
//@access public
const getPreviewCourse = expressAsyncHandler(async(req, res, next)=>{
  try {
    const courseId = req.params.courseId;
    const requiredCourse = await Courses.findById(courseId).select('-enrollmentKey -files');
    if (requiredCourse) {
      res.status(200).json(requiredCourse);
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
})


//@desc Return if enrollment key is available in course or not
//@route PUT /course/enrollmentStatus
//@access private
const putStatusToken = expressAsyncHandler(async (req, res, next) => {
  try {
    const { courseId, key } = req.body;

    // Check if key is provided
    if (!key) {
      return res.status(400).json({ error: "Enrollment key is required" });
    }

    // Find the course by ID
    const reqCourse = await Courses.findById(courseId);

    // Check if course exists
    if (!reqCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Find the index of the enrollment key in the course's enrollmentKey array
    const enrollmentKeyIndex = reqCourse.enrollmentKey.findIndex((item) => item.toString() === key.toString());

    if (enrollmentKeyIndex !== -1) {
      // Remove the enrollment key from the array
      reqCourse.enrollmentKey.splice(enrollmentKeyIndex, 1);
      await reqCourse.save();

      return res.status(200).json({ message: "Enrollment key is valid and has been used" });
    } else {
      return res.status(400).json({ message: "Invalid enrollment key" });
    }
  } catch (error) {
    console.error('Error checking enrollment key status:', error); // Log the detailed error
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
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

module.exports = { postCourse, getCourse, deleteCourse, updateCourse, getPreviewCourse, putStatusToken, postFiles };
