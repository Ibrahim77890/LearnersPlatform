import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom";
import CoursesList from "./CoursesList";
import NewCourse from "./NewCourse";

//This is simply the dashboard of our app
const Home = () => {
  const [showAddCourse, setShowAddCourse] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setShowAddCourse(location.pathname === '/home/new-course');
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-screen flex flex-row bg-gray-300">
      <Sidebar />
      <div className="flex-1">
        {showAddCourse ? <NewCourse/>: <CoursesList/>}
      </div>
    </div>
  );
};

export default Home;
