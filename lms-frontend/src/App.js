import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import NewCourse from './pages/NewCourse';
import Course from './pages/Course';

function App() {
  return (
    <div className="App bg-gray-300">
      <Router>
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='/home' element={<Home/>}/>
          <Route path='/home/new-course' element={<NewCourse/>} />
          <Route path='/course/element' element={<Course/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
