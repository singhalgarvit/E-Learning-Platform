import React, {useContext, useEffect} from "react";
import "../styles/course.css";
import CourseContainer from "../components/CourseContainer";
import {useCourse} from "../hooks/useCourse";
import {CourseContext} from "../context/courseContext";

function Course() {
  const {getCourse, loading, error} = useCourse();
  const {courses} = useContext(CourseContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getCourse();
      } catch (error) {
        console.error("Something Went Wrong !!");
      }
    };
    fetchData();
  }, [courses]);

  return (
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
  );
}

export default Course;
