import React from "react";
import { useNavigate } from "react-router-dom";
// import { Worker, Viewer } from "@react-pdf-viewer/core";
// import PDFViewer from "../components/PDFViewer";
import "./styles.css";

const UserCourse = () => {
  const pdfFiles = [
    {
      id: 1,
      url: "C:/Users/HP/OneDrive/Desktop/Ibrahim Learner Licence.pdf",
      name: "Document 1",
    },
  ];

  const contentSample = [
    { number: "Chapter 1", name: "Nigga" },
    { number: "Chapter 2", name: "Nigga" },
    { number: "Chapter 3", name: "Nigga" },
  ];

  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/dashboard");
  };
  return (
    <div className="h-screen w-screen flex gap-8 flex-col bg-gray-300 overflow-auto px-8">
      <p
        onClick={handleRedirect}
        className="mt-8 text-gray-800 font-semibold cursor-pointer mb-16 ubuntu-medium"
      >
        Dashboard
      </p>
      <p className="ubuntu-medium text-6xl">Professional Ethics</p>
      <p className="ubuntu-medium text-4xl">Dr. Neelma Riaz</p>
      <p className="ubuntu-medium text-2xl">Content</p>
      <div className="h-fit w-full flex flex-col border-black border-2 ubuntu-regular p-0">
      {contentSample.map((item, index) => {
        return (
            <div className="flex flex-row border-2 border-black justify-evenly">
            <p>{item.number}</p>
            <p>{item.name}</p>
            </div>
        );
    })}
    </div>
      {/* Dynamically render course content here in the table */}
      <p className="ubuntu-medium text-2xl">Course Files</p>
      {pdfFiles.map((file) => (
        <div key={file.id} className="border-black border-2 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">{file.name}</h2>
          {/* <PDFViewer fileUrl={file.url} /> */}
        </div>
      ))}
    </div>
  );
};

export default UserCourse;
