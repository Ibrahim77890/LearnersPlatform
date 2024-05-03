const { default: mongoose } = require("mongoose");
const Users = require("./user");

/*
Here I wanted that User and List of courses object containing course title and course contents list and each marked as true or false
*/

const userCourseProgressSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courses:[{
        course: {
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

const UserCourseProgress = mongoose.model('User', userCourseProgressSchema);
module.exports = UserCourseProgress;
