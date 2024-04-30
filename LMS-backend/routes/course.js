const express = require("express");
const multer = require("multer");
const {
  postCourse,
  getCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const router = express.Router();

//Storage of files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const filenameReq=file.fieldname.toString();
    cb(null, uniqueSuffix + filenameReq);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== "application/pdf") {
      // Check file mimetype
      return cb(new Error("Only PDF files are allowed")); // Reject non-PDF files
    }
    cb(null, true);
  },
});

//Enter new course in a list
router
  .route("/courses/new-course")
  .post(verifyTokenAndAdmin, upload.array('pdfFiles'), postCourse);

//Get a course details from a list
router.route("/courses/:courseId/details").get(verifyToken, getCourse);

//Update a course
router
  .route("/courses/:courseId/update")
  .put(verifyTokenAndAdmin, updateCourse);

//Delete a course
router.route("/courses/:courseId").delete(verifyTokenAndAdmin, deleteCourse);

module.exports = router;
