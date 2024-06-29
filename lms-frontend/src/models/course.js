export const courseModel = {
  code: "",
  title: "",
  description: "",
  major: "",
  instructor: "",
  price: 0.0,
  availability: false,
  contentArray: [""],
  image: null,
  contentFiles: [null],
};

export const courseChecker = ({ course }) => {

    const {
      code,
      title,
      description,
      major,
      instructor,
      contentArray,
      image,
      contentFiles,
    } = course;
  
    if (
      !code ||
      !title ||
      !description ||
      !major ||
      !instructor ||
      !contentArray ||
      !contentFiles ||
      !image
    ) {
      console.error('Course object is missing required properties');
      return false;
    }

    return true;
  };