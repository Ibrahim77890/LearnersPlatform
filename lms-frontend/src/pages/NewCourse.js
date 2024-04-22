import React, { useState } from 'react';

const NewCourse = () => {
  const [course, setCourse] = useState({
    code: '',
    title: '',
    description: '',
    major: '',
    instructor: '',
    price: 0.0,
    availability: false,
    contentsFile: null,
    photoFile: null,
    pdfFolder: []
  });

  const handleSubmit = () => {
    const { code, title, description, instructor, price, contentsFile, photoFile, major, pdfFolder } = course;
  if (!code || !title || !description || !instructor || !price || !contentsFile || !photoFile || !major || !pdfFolder) {
    // If any of the required fields are empty, display an alert or handle the error accordingly
    alert('Please fill in all required fields.');
    return;
  }
  console.log(course);
  }

    const handleChange = (event) => {
    const { name, type, files } = event.target;

    if (type === 'file' && name === 'contentsFile') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContents = e.target.result;
        const chapters = parseFileContents(fileContents);
        console.log(chapters);
        setCourse({
          ...course,
          [name]: chapters
        });
      };
      reader.readAsText(files[0]);
    } else if( type === 'file' && name === 'pdfFolder'){
      const filesFolder = files;
      const newPdfFiles = [];

      for(let i=0; i<filesFolder.length; i++){
        const file = filesFolder[i];
        if (file.type === 'application/pdf') {
          newPdfFiles.push(file);
        }
      }

      setCourse({
        ...course,
        pdfFolder: [...course.pdfFolder, ...newPdfFiles]
      });

      console.log(course.pdfFolder);

    } else {
      const { value } = event.target;
      setCourse({
        ...course,
        [name]: value
      });
      console.log(name, value);
    }
  };


  const parseFileContents = (fileContents) => {
    const lines = fileContents.split('\n');
    const chapters = {};
  
    lines.forEach(line => {
      const match = line.match(/^chapter(\d+)\s(.*)/);
      if (match) {
        const chapterNumber = match[1];
        const chapterName = match[2];
        chapters[chapterNumber] = chapterName;
      }
    });
  
    return chapters;
  };

  
  return (
    <div className="min-h-screen mx-4 bg-gray-300">
      <p className='text-lg font-sans font-bold'>Enter details for the new course being added!</p>
      <div className="my-4">
        <label className="block uppercase tracking-wide text-xs font-bold">Code</label>
        <input className="w-full shadow-inner p-4 border-0 h-2" type="text" name="code" placeholder="e.g., HU-xxx" onChange={handleChange}/>
      </div>
      <div className="mb-4">
        <label className="block uppercase tracking-wide text-xs font-bold">Title</label>
        <input className="w-full shadow-inner p-4 border-0 h-2" type="text" name="title" placeholder="e.g., engineering" onChange={handleChange}/>
      </div>
      <div className="md:flex mb-6">
        <div className="md:w-1/5">
          <legend className="uppercase tracking-wide text-xs font-bold">Description</legend>
        </div>
        <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
          <textarea className="w-full shadow-inner p-4 border-0" placeholder="Enter course description" rows="6" name="description" onChange={handleChange}></textarea>
        </div>
      </div>
      <div className="mb-4">
        <label className="block uppercase tracking-wide text-xs font-bold">Major</label>
        <input className="w-full shadow-inner p-4 border-0 h-2" type="text" name="major" placeholder="Major" onChange={handleChange}/>
      </div>
      <div className="mb-4">
        <label className="block uppercase tracking-wide text-xs font-bold">Instructor</label>
        <input className="w-full shadow-inner p-4 border-0 h-2" type="text" name="instructor" placeholder="Name" onChange={handleChange}/>
      </div>
      <div className='md:flex mb-4 justify-between gap-8'>
        <div className="mb-4 md:flex-1">
          <label className="block uppercase tracking-wide text-xs font-bold">Price</label>
          <input className="w-full shadow-inner p-4 border-0 h-2" type="number" name="price" placeholder="e.g., 16.00$" onChange={handleChange}/>
        </div>
        <div className="mb-4 flex flex-row">
          <label className="block uppercase tracking-wide text-xs font-bold">Course Available?</label>
          <input className="w-full shadow-inner p-4 border-0 h-8 mt-2" type="checkbox" name="availability" onChange={handleChange}/>
        </div>
      </div>
      <div className='flex flex-row'>
      <div className="mb-4 flex-1">
        <label className="block uppercase tracking-wide text-xs font-bold">Course Contents File Selection</label>
        <input className="w-fit shadow-inner p-4 border-2 border-slate-600 h-fit cursor-pointer" type="file" name="contentsFile" onChange={handleChange}/>
      </div>
      <div className="mb-4 flex-1">
        <label className="block uppercase tracking-wide text-xs font-bold">Course Title Photo Selection(.png, .jpg)</label>
        <input className="w-fit shadow-inner p-4 border-2 border-slate-600 h-fit cursor-pointer" type="file" name="photoFile" onChange={handleChange}/>
      </div>
      <div className="mb-4 flex-1">
        <label className="block uppercase tracking-wide text-xs font-bold">Select Folder of .pdf Files</label>
        <input className="w-fit shadow-inner p-4 border-2 border-slate-600 h-fit cursor-pointer" multiple={true} type="file" name="pdfFolder" accept=".pdf" onChange={handleChange}/>
      </div>
      </div>
      <button onClick={handleSubmit} class="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-blue-700 border-blue-800 text-white">
        Submit
    </button>
    </div>
  )
}

export default NewCourse;
