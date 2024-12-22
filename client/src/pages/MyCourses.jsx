import React, {useContext, useEffect} from "react";
import "../styles/course.css";
import CourseContainer from "../components/CourseContainer";
import {useCourse} from "../hooks/useCourse";
import {CourseContext} from "../context/courseContext";
import {AuthContext} from "../context/authContext";

function MyCourse() {
  const {getMyCourses, error} = useCourse();
  const {myCourses} = useContext(CourseContext);
  const {token} = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getMyCourses(token);
      } catch (error) {
        console.error("Something Went Wrong !!");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>My Courses</h1>
      <div className="coursePage">
        <title>Courses</title>
        {error && <h1>An Error Occured</h1>}
        {myCourses.length == 0 && <h3>No Course Found</h3>}
        {!error &&
          myCourses.map((course, index) => (
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

export default MyCourse;
