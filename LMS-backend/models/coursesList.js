const { default: mongoose } = require("mongoose");

const coursesListSchema = mongoose.Schema(
    {
        listname: {
            type: String
        },
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course'
            }
        ]
    },
    {
        timestamps: true,
    }
);

const CoursesList = mongoose.model('CourseList', coursesListSchema);
module.exports = CoursesList