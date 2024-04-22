const express = require('express');
const multer = require('multer');
const { postCourse, getCourse, updateCourse, deleteCourse } = require('../controllers/course');
const router = express.Router();

//Storage of files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.filename);
    }
})
const upload = multer({ storage: storage });

//Enter new course in a list
router.route('/courses/new-course').post(upload.array('pdfFiles'),postCourse);

//Get a course details from a list
router.route('/courses/:courseId/details').get(getCourse);

//Update a course
router.route('/courses/:courseId/update').put(updateCourse);

//Delete a course
router.route('/courses/:courseId').delete(deleteCourse);

