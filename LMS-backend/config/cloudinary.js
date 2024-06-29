const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
    cloud_name: "dl5hzmrcz",
    api_key: '284834458455498',
    api_secret: 'hIKLj3rGVP7Ye4jf4MUXvP69DeI'
});

module.exports = cloudinary;