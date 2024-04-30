const { default: mongoose } = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    major: {
      type: String,
    },
    instructor: {
      type: String,
    },
    enrollmentKey: [
      {
        type: String,
        required: true,
      },
    ],
    contents: [
      {
        type: String,
      },
    ],
    // For storing files of content pdf in array of files
    pdfFiles: [
      {
        filename: String,
        type: String,
      },
    ],
    availableForPurchase: {
      type: Boolean,
      required: true,
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

    const pdfFilesReq = req.files.map((file) => ({
      filename: file.filename,
      type: file.mimetype,
    }));

    if (await Courses.findOne({ code })) {
        throw new Error(`A course with code ${code} already exists.`);
    }


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
      pdfFiles: pdfFilesReq,
      availableForPurchase,
    });

    // Save the course to the database
    await newCourse.save();
    return newCourse;
  } catch (e) {
    throw new Error("Error saving new course in method: ",e);
  }
};

const Courses = mongoose.model("Course", courseSchema);
module.exports = Courses;
