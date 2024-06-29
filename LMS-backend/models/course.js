const { default: mongoose } = require("mongoose");
const cloudinary = require("../config/cloudinary");

const fileSchema = new mongoose.Schema({
  path: String,
  originalName: String,
  mimeType: String,
  size: Number,
  uploadDate: { type: Date, default: Date.now },
});

const courseSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      default: "unknown", // Default value for code field
    },
    title: {
      type: String,
      required: true,
      default: "unknown", // Default value for title field
    },
    description: {
      type: String,
      default: "unknown", // Default value for description field
    },
    price: {
      type: Number,
      required: true,
      default: 0, // Default value for price field
    },
    major: {
      type: String,
      default: "unknown", // Default value for major field
    },
    instructor: {
      type: String,
      default: "unknown", // Default value for instructor field
    },
    enrollmentKey: [
      {
        type: String,
        default: "unknown", // Default value for enrollmentKey field
      },
    ],
    contents: [
      {
        type: String,
        default: "unknown", // Default value for contents field
      },
    ],
    // For storing files of content pdf in array of files
    files: [fileSchema],
    image: {
      type: fileSchema,
    },
    availableForPurchase: {
      type: Boolean,
      required: true,
      default: false, // Default value for availableForPurchase field
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
      major,
      instructor,
      contentArray,
      availability,
      price,
    } = req.body;
    
    const imageFile = req.files["image"] ? req.files["image"][0] : null;
    const contentFiles = req.files["contentFiles"] || [];


    if (await Courses.findOne({ code })) {
      throw new Error(`A course with code ${code} already exists.`);
    }
    let imageMetadata = null;
    if (imageFile.size!=0) {
      const result = await cloudinary.uploader.upload(imageFile.path, {
        folder: "course_images",
      });
      console.log("Control here1")
      imageMetadata = {
        path: result.secure_url,
        originalName: imageFile.originalname,
        mimeType: imageFile.mimetype,
        size: imageFile.size,
      };
    }
    
    const contentFilesMetadata = await Promise.all(
      contentFiles.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "course_content_files",
        });
        console.log("Control here2")
        return {
          path: result.secure_url,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
        };
      })
    );
    
    // Create a new course document
    const newCourse = new Courses({
      code,
      title,
      description,
      major,
      instructor,
      contents: contentArray,
      image: imageMetadata,
      files: contentFilesMetadata,
      availableForPurchase: availability,
      price,
    });

    // Save the course to the database
    await newCourse.save();
    console.log("Course Save Successfull");
    return newCourse;
  } catch (e) {
    console.log(e);
  }
};

const Courses = mongoose.model("Course", courseSchema);
module.exports = Courses;
