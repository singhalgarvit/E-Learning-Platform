import {Routes, Route, Navigate} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Course from "./pages/Course";
import CourseDetail from "./pages/CourseDetail";
import MyCourses from "./pages/MyCourses";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/admin/Dashboard";
import AddCourse from "./pages/admin/AddCourse";
import ProtectedRoute from "./components/ProtectedRoute";
import {useContext} from "react";
import {AuthContext} from "./context/authContext";

function App() {
  const {token} = useContext(AuthContext);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} /> //This is the route for home page
        <Route path="/course" element={<Course />} /> //this is the route to seeall the courses
        <Route path="/course/:course_id" element={<CourseDetail />} /> //this is
        the route to see all the courses
        <Route //This is the route to see the purschased course
          path="/MyCourses"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <MyCourses />
            </ProtectedRoute>
          }
        />
        <Route //if the user is not logged in then this route will take them to login
          path="/login"
          element={token ? <Navigate to="/" /> : <Login />}
        />
        <Route //if the user is not signed in then this route will take them to signin
          path="/signup"
          element={token ? <Navigate to="/" /> : <Signup />}
        />
        <Route //if the user is admin then this is admin route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route //if the user is admin then this is admin route
          path="/admin/addcourse"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddCourse />
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={<Navigate to="/" />} /> //if route is not
        defined here
      </Routes>
    </div>
  );
}

export default App;
