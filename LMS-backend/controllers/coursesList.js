const expressAsyncHandler = require("express-async-handler");
const Courses = require("../models/course");
const UserCourseProgress = require("../models/userCourseProgress");

//@desc Return latest courses
//@route GET /courses/latest
//@access public
const getLatestCourses = expressAsyncHandler(async (req, res, next) => {
  try {
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

    const latestCourses = await Courses.find({
      createdAt: { $gte: fifteenDaysAgo },
    });
    res.status(200).json({ courses: latestCourses });
  } catch (error) {
    console.error("Error fetching latest courses:", error.message);
    console.error("Stack Trace:", error.stack);
    res.status(500).json({ error: "Internal Here Server Error" });
  }
});

//@desc Get all courses of all users
//@route Get /courses/all-data
//@access private for admin
const getAllCourses = expressAsyncHandler(async (req, res, next) => {
    console.log("hailing");
    try {
        const userCourseProgress = await UserCourseProgress.find();
        
        if (!userCourseProgress || userCourseProgress.length === 0) {
            console.log("No user course progress found");
            return res.status(404).json({ error: "No user course progress found" });
        }

        const promises = userCourseProgress.map(async (progress) => {
            const currentUser = progress.userId;
            const currentUserCourses = await Promise.all(progress.courses.map(async (course) => {
                console.log(`Fetching course details for course ID: ${course.courseId}`);
                const response = await Courses.findById(course.courseId, 'title').lean();
                if (response) {
                    return response.title;
                } else {
                    console.error(`Course with ID ${course.courseId} not found`);
                    return null;
                }
            }));

            return {
                userId: currentUser,
                courses: currentUserCourses.filter(Boolean)
            };
        });

        const allUsersData = await Promise.all(promises);

        console.log("All users data:", allUsersData);

        if (allUsersData.length === 0) {
            return res.status(404).json({ error: "No user data was found" });
        }

        res.status(200).json({ users: allUsersData });

    } catch (error) {
        console.error("Error fetching user courses:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//@desc Return free courses
//@route GET /courses/free
//@access public
const getFreeCourses = expressAsyncHandler(async (req, res, next) => {
  try {
    const freeCourses = await Courses.find({ price: 0 });
    res.status(200).json({ courses: freeCourses });
  } catch (error) {
    res.status(500).json({ error: "Internal Here Server Error" });
  }
});

//@desc Return top courses
//@route GET /courses/top
//@access public
const getTopCourses = expressAsyncHandler(async (req, res, next) => {
  try {
    const topCourses = await Courses.find({ price: 0 });
    res.status(200).json({ courses: topCourses });
  } catch (error) {
    res.status(500).json({ error: "Internal Here Server Error" });
  }
});

//@desc Return courses for a particular major
//@route GET /courses/:major
//@access public
const getMajorCourses = expressAsyncHandler(async (req, res, next) => {
  try {
    const majorReq = req.params.major;
    const reqCourses = await Courses.find({ major: majorReq });
    res.status(200).json(reqCourses);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//@desc Return courses for a search query
//@route GET /courses/search?q={:seacrhterm}
//@access public
const getSearchCourses = expressAsyncHandler(async (req, res, next) => {
  try {
    const searchTerm = req.query.q;
    console.log(`Search Term: ${searchTerm}`);

    if (!searchTerm) {
      return res.status(200).json([]);
    }

    const reqCourses = await Courses.find({
      title: { $regex: searchTerm, $options: "i" },
    }).limit(10);

    console.log(reqCourses)

    res.status(200).json({ reqCourses });
  } catch (error) {
    res.status(500).send(err.message);
  }
});

module.exports = {
  getLatestCourses,
  getFreeCourses,
  getMajorCourses,
  getTopCourses,
  getSearchCourses,
  getAllCourses
};
