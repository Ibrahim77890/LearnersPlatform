const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/dbConnection');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');
const courseListRoutes = require('./routes/coursesList');
const cartRoutes = require('./routes/purchase')
const myCoursesRoutes = require('./routes/userCourses')
const bodyParser = require('body-parser');
const path = require('path')
const cors = require('cors');
const Cart = require('./models/cart');
dotenv.config();

connectDb();

async function clearCartCollection(req, res, next) {
    try {
      await Cart.deleteMany({});
    } catch (error) {
      console.error('Error clearing cart collection:', error);
    }
}

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.static('files'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(authRoutes);
app.use("/my-courses", myCoursesRoutes);
app.use("/course",courseRoutes);
app.use("/courses",courseListRoutes);
app.use("/cart",cartRoutes)

app.listen(port, ()=>{
    // clearCartCollection()
    console.log(`Server running on port ${port}`);
});