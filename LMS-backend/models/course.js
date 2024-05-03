const { default: mongoose } = require("mongoose");

const pdfFileSchema = {
  filename: String, // Filename of the file
  path: String, // Path to the file
  mimetype: String, // Mime type of the file
};

const courseSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      default: 'unknown' // Default value for code field
    },
    title: {
      type: String,
      required: true,
      default: 'unknown' // Default value for title field
    },
    description: {
      type: String,
      default: 'unknown' // Default value for description field
    },
    price: {
      type: Number,
      required: true,
      default: 0 // Default value for price field
    },
    major: {
      type: String,
      default: 'unknown' // Default value for major field
    },
    instructor: {
      type: String,
      default: 'unknown' // Default value for instructor field
    },
    enrollmentKey: [
      {
        type: String,
        required: true,
        default: 'unknown' // Default value for enrollmentKey field
      },
    ],
    contents: [
      {
        type: String,
        default: 'unknown' // Default value for contents field
      },
    ],
    // For storing files of content pdf in array of files
    pdfFiles:[
      pdfFileSchema
      ],
    availableForPurchase: {
      type: Boolean,
      required: true,
      default: false // Default value for availableForPurchase field
    },
  },
  {
    timestamps: true,
  }
);


courseSchema.methods.addCourse = async function (req) {
  try {
    const {
      code,
      title,
      description,
      price,
      major,
      instructor,
      enrollmentKey,
      contents,
      availableForPurchase,
    } = req.body;
   



    const pdfFiles = req.files.map(file => ({
      filename: file.filename, // Assuming originalname contains the filename
      path: file.path ,// Assuming path contains the path to the uploaded file
      mimetype:file.mimetype
    }));

    if (await Courses.findOne({ code })) {
        throw new Error(`A course with code ${code} already exists.`);
    }

    //console.log(await Courses.countDocuments());

    // Create a new course document
    const newCourse = new Courses({
      code,
      title,
      description,
      price,
      major,
      instructor,
      enrollmentKey,
      contents,
      pdfFiles,
      availableForPurchase:true,
    });

    // Save the course to the database
    await newCourse.save();
    console.log("Course Save Successfull")
    return newCourse;
  } catch (e) {
   console.log(e)
  }
};

const Courses = mongoose.model("Course", courseSchema);
module.exports = Courses;
