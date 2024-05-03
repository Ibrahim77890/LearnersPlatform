const expressAsyncHandler = require("express-async-handler");
const UserCourseProgress = require("../models/userCourseProgress");
const Courses = require("../models/course");

//@desc Get all personal courses
//@route Get /my-courses
//@access private for user
const getUserCourses = expressAsyncHandler(async(req, res, next) => {
    try {
        // Get the current user ID
        const userId = req.user._id;

        // Extract such UserCourseProgress model of our particular user
        const userCourses = await UserCourseProgress.findOne({ user: userId });

        if (!userCourses) {
            return res.status(404).json({ error: 'User course progress not found for the current user' });
        }

        // Extract course ids array from courses field of our object
        const courseIDs = userCourses.courses.map(courseObject => courseObject.course);

        const courses = await Courses.find({ _id: { $in: courseIDs } }, 'title');

        // Extract the course names from the retrieved courses
        const courseNames = courses.map(course => course.title);

        res.json(courseNames);
    } catch (e) {
        console.error('Error fetching user courses:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getUserCourse = expressAsyncHandler(async(req, res, next)=>{
    //Here i must first get user id then i get a courseId for its contents and tracked details
    try {
        // Get the current user ID
        const userId = req.user._id;
        const courseId = req.body.courseId;

        // Extract such UserCourseProgress model of our particular user
        const userCourses = await UserCourseProgress.findOne({ user: userId });

        if (!userCourses) {
            return res.status(404).json({ error: 'User course progress not found for the current user' });
        }

        const course = userCourses.courses.find(courseObject => courseObject.course.toString() === courseId);

        if (!course) {
            return res.status(404).json({ error: 'Course not found for the current user' });
        }

        // Return the contents array of the found course
        res.json(course.contents);
    } catch (error) {
        console.error('Error fetching user course:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


module.exports = {getUserCourses, getUserCourse}