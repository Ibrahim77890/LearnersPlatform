const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');
const bodyParser = require('body-parser');
connectDb();

const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(authRoutes);
app.use(courseRoutes)

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});