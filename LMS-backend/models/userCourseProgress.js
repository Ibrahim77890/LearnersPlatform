const { default: mongoose } = require("mongoose");
const Users = require("./user");

/*
Here I wanted that User and List of courses object containing course title and course contents list and each marked as true or false
*/

const userCourseProgressSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courses:[{
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true
        },
        contents: [{
            contentItem: {
              type: String,
              required: true
            },
            isCompleted: {
              type: Boolean,
              default: false
            }
        }]
}],
},{timestamps:true});

const UserCourseProgress = mongoose.model('UserCourseProgress', userCourseProgressSchema);
module.exports = UserCourseProgress;


