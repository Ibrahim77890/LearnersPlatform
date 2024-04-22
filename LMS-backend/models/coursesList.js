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

module.exports = mongoose.model('CourseList', coursesListSchema);