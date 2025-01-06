import React, {useContext, useEffect} from "react";
import "../styles/course.css";
import CourseContainer from "../components/CourseContainer";
import {useCourse} from "../hooks/useCourse";
import {CourseContext} from "../context/courseContext";
import { AuthContext } from "../context/authContext";

function Course() {
  const {token} = useContext(AuthContext)
  const {getCourse, getMyCourses, error} = useCourse();
  const {courses} = useContext(CourseContext);

  useEffect(() => {
    const fetchData = async () => {
       const res= await getCourse();
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>All Courses</h1>
      <div className="coursePage">
        <title>Courses</title>
        {error && <h1>An Error Occured</h1>}
        {!error &&
          courses.map((course, index) => (
            <CourseContainer
              key={index}
              name={course.name}
              img={course.img}
              details={course.details}
              price={course.price}
              id={course._id}
            />
          ))}
      </div>
    </>
  );
}

export default Course;
